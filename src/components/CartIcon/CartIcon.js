import React from 'react'
// import {CartContext} from '../../contexts/cart';
import {ShoppingIcon,CartIconContainer,ItemCount} from  './CartIcon.styles'

import { useSelector,useDispatch } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.actions';
import { selectCartItemsCount, selectIsCartOpen } from '../../store/cart/cart.selector';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartItemsCount);
  // const {cartItemCount} = useContext(CartContext)

  // const toggleCartOpen = () =>  setIsCartOpen(!isCartOpen);
  const toggleCartOpen = () =>  dispatch(setIsCartOpen(!isCartOpen));


  return (
    <CartIconContainer onClick={toggleCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon