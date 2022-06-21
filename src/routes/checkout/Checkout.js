import React from "react";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/PaymentForm.component";

import "./Checkout.scss";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartPrice = useSelector(selectCartTotalPrice);

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems?.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">TOTAL: ${cartPrice}</div>
      <PaymentForm/>
    </div>
  );
};

export default Checkout;
