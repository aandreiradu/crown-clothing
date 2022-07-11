import {FC,memo} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addItemToCart,removeItemFromCart,clearItemFromCart }  from '../../store/cart/cart.actions'
import { CartItem } from '../../store/cart/cart.types';
import {CheckoutItemContainer,ImageContainer,TextContainer,QuantityContainer,RemoveButtonContainer} from  './CheckoutItem.styles'
import { selectCartItems } from '../../store/cart/cart.selector';

type CheckoutItemProps = {
  cartItem : CartItem
}

const CheckoutItem : FC<CheckoutItemProps> = memo((props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const {imageUrl,name,price,quantity} = props.cartItem;


  const addItemToCartHandler = () =>  dispatch(addItemToCart(cartItems,props.cartItem)) 

  const removeItemFromCartHandler = () =>  dispatch(removeItemFromCart(cartItems,props.cartItem));

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,props.cartItem));


  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <TextContainer className='name'> {name} </TextContainer>
      <QuantityContainer>
        <div className='arrow' onClick={removeItemFromCartHandler}>
          &#10094;
        </div>
        <TextContainer className='value'>{quantity}</TextContainer>
        <div className='arrow' onClick={addItemToCartHandler}>
          &#10095;
        </div>
      </QuantityContainer>
      <TextContainer className='price'> {price}</TextContainer>
      <RemoveButtonContainer onClick={clearItemHandler}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  )
});

export default CheckoutItem