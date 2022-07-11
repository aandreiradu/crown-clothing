import  { useState, FormEvent } from "react";
import { useSelector,useDispatch } from "react-redux";
import { clearCartAfterPayment } from "../../store/cart/cart.actions";
import { selectCartTotalPrice } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";
import { BUTTON_TYPES_CLASSES } from "../button/button.component";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./PaymentForm.styles";

const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotalPrice);
  const currentUser = useSelector(selectCurrentUser);
    
  const paymentHandler = async (e : FormEvent<HTMLFormElement>) => {
    // make api request to stripe
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
      }),
    });

    const responseData = await response.json();
    const {
      paymentIntent: { client_secret },
    } = responseData;

    console.log(client_secret);

    const cardDetails = elements.getElement(CardElement);
    if(!cardDetails) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      console.log(paymentResult.error);
      alert(paymentResult.error.message);
    } else {
      if ((paymentResult.paymentIntent.status = "succeeded")) {
        dispatch(clearCartAfterPayment());
        console.log("paymentResult succeeded", paymentResult);
        alert("Payment Successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Cred Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPES_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
