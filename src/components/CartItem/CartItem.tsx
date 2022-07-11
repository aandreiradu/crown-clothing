import React,{FC, memo} from 'react'

import {CartItemContainer,ItemDetails} from  './CartItem.styles'

import { CartItem as TCartItem } from '../../store/cart/cart.types';

type CartItemProps = {
  cartItem: TCartItem
}

const CartItem : FC<CartItemProps> = memo((props) => {
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
})

export default CartItem