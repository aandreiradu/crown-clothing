import {FC} from "react";
// import { CartContext } from '../../contexts/cart'
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import { ProductCartContainer,Footer,Name,Price } from "./ProductCard.styles";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.actions";
import { selectCartItems } from "../../store/cart/cart.selector";
import { CategoryItem } from "../../store/categories/categories.types";

type ProductCardProps = {
  product : CategoryItem
}

const ProductCard : FC<ProductCardProps> = (props) => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const { name, price, imageUrl } = props.product;
  // const {addItemToCart} = useContext(CartContext);

  const addItemHandler = () => {
    // addItemToCart(props.product);
    dispatch(addItemToCart(cartItems, props.product));
  };

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name className="name">{name}</Name>
        <Price className="price">{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPES_CLASSES.inverted}
        onClick={addItemHandler}
      >
        Add to cart
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
