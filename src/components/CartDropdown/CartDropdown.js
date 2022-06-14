import React,{useContext} from 'react'
import { CartContext } from '../../contexts/cart';
import Button from '../button/button.component';
import CartItem from '../CartItem/CartItem';
import {useNavigate} from 'react-router-dom'


import {CartDropdownContainer,EmptyMessage,CartItems} from  './CartDropdown.style';


const CartDropdown = () => {  
  const navigate = useNavigate();
  const {cartItems,setIsCartOpen} = useContext(CartContext);


  const closeMenuHandler = () => {
    setIsCartOpen(false);
    navigate('/checkout');
    return;
  }

  return (
    <CartDropdownContainer>
        <CartItems>
        {
          cartItems.length ? 
              (cartItems.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)) 
          : 
              (<EmptyMessage>Your cart is empty 😕</EmptyMessage>)
        }
        </CartItems>
          <Button onClick={closeMenuHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown