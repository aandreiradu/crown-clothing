import React from "react";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/PaymentForm.component";

// import { CheckoutContainer,CheckoutHeader,HeaderBlock,Total } from './Checkout.styles'
import {CheckoutPageContainer,CheckoutHeaderContainer,HeaderBlockContainer,TotalContainer,WarningContainer } from './Checkout.styles'

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartPrice = useSelector(selectCartTotalPrice);

  return (
    <CheckoutPageContainer>
    <CheckoutHeaderContainer>
      <HeaderBlockContainer>
        <span>Product</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Description</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Quantity</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Price</span>
      </HeaderBlockContainer>
      <HeaderBlockContainer>
        <span>Remove</span>
      </HeaderBlockContainer>
    </CheckoutHeaderContainer>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <TotalContainer>TOTAL: ${cartPrice}</TotalContainer>
    <WarningContainer>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </WarningContainer>
    <PaymentForm />
  </CheckoutPageContainer>
  );
};

export default Checkout;
