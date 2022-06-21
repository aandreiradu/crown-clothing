import React from 'react'

import { useDispatch,useSelector } from 'react-redux';
import { addItemToCart,removeItemFromCart,clearItemFromCart }  from '../../store/cart/cart.actions'

import {CheckoutItemContainer} from  './CheckoutItem.styles'
import { selectCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {imageUrl,name,price,quantity} = props.cartItem;


  const addItemToCartHandler = () =>  dispatch(addItemToCart(cartItems,props.cartItem)) 

  const removeItemFromCartHandler = () =>  dispatch(removeItemFromCart(cartItems,props.cartItem));

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,props.cartItem));


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