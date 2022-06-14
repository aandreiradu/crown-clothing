import React from 'react'



import {CartItemContainer,ItemDetails} from  './CartItem.styles'

const CartItem = (props) => {
    const {name,price,quantity,imageUrl} = props.cartItem;
  return (
    <CartItemContainer>
        <img src={imageUrl} alt={name}/>
        <ItemDetails>
            <span className='name'>{name}</span>
            <span className='price'>{quantity} x ${price}</span>
        </ItemDetails>
    </CartItemContainer>
  )
}

export default CartItem