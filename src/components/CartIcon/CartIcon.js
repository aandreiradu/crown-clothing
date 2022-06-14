import React,{useContext} from 'react'
import {CartContext} from '../../contexts/cart';
import {ShoppingIcon,CartIconContainer,ItemCount} from  './CartIcon.styles'



const CartIcon = () => {
  const {setIsCartOpen,cartItemCount} = useContext(CartContext)

  const toggleCartOpen = () => {
    setIsCartOpen(prevState => !prevState);
  } 

  return (
    <CartIconContainer onClick={toggleCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{cartItemCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon