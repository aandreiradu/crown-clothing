import React,{useContext} from 'react'
import {CartContext} from '../../contexts/cart';
import Button from '../button/button.component';

import {CheckoutItemContainer} from  './CheckoutItem.styles'

const CheckoutItem = (props) => {
  const {imageUrl,name,price,quantity} = props.cartItem;
  const {addItemToCart,removeItemFromCart,clearItemFromCart} = useContext(CartContext);
  

  const addItemToCartHandler = () => addItemToCart(props.cartItem);

  const removeItemFromCartHandler = () => removeItemFromCart(props.cartItem);

  const clearItemHandler = () => clearItemFromCart(props.cartItem);


  return (
    <CheckoutItemContainer>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className='name'> {name} </span>
      <span className='quantity'>
        <div className='arrow' onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </span>
      <span className='price'> {price}</span>
      <div className='remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem