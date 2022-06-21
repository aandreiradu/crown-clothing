import React,{useContext} from 'react'
// import { CartContext } from '../../contexts/cart';
import Button from '../button/button.component';
import CartItem from '../CartItem/CartItem';
import {useNavigate} from 'react-router-dom'

import { useDispatch,useSelector } from 'react-redux';
import {setIsCartOpen} from '../../store/cart/cart.actions';
import { selectCartItems } from '../../store/cart/cart.selector';

import {CartDropdownContainer,EmptyMessage,CartItems} from  './CartDropdown.style';


const CartDropdown = () => {  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const closeMenuHandler = () => {
    // setIsCartOpen(false);
    dispatch(setIsCartOpen(false));
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