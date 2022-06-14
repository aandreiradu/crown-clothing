import React,{useContext} from 'react'
import { CartContext } from '../../contexts/cart'
import Button, {BUTTON_TYPES_CLASSES} from '../button/button.component';
import './ProductCard.scss';


const ProductCard = (props) => {
    const {name,price,imageUrl} = props.product;
    const {addItemToCart} = useContext(CartContext);

  const addItemHandler = () => {
    addItemToCart(props.product);
  } 

  return (
    <div className='product-card-container'>
        <img src={imageUrl} alt={name} />
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addItemHandler}>Add to cart</Button>
    </div>
  )
}

export default ProductCard