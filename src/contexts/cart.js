import { createContext, useState, useEffect } from "react";

export const addCartItem = (cartItems, productToAdd) => {
  // find if cartitems contains productToAdd :
  // if found => increase quantity
  // if not found => return new array based on the old array and append this specific product

  // get the index of existing item (probably)
  const existingItemIndex = cartItems.findIndex(
    (item) => item.id === productToAdd.id
  );
  // based on this index, get the item;
  const existingItem = cartItems[existingItemIndex];

  let updatedItems;

  // check if we have the exsisting item;
  if (existingItem) {
    const updatedItem = {
      ...existingItem,
      quantity: existingItem.quantity + 1,
    };

    // save whatever is in the cart so far;
    updatedItems = [...cartItems];

    // update the existing item from cart;
    updatedItems[existingItemIndex] = updatedItem;
  } else {
    // dont have this item in the cart => just add it
    updatedItems = [...cartItems, { ...productToAdd, quantity: 1 }];
  }

  return updatedItems;
};

export const removeCartItem = (cartItems, productToRemove) => {
  // find index of item;
  const cartExistingItemIndex = cartItems.findIndex((item) => item.id === productToRemove.id);
  const cartExistingItem = cartItems[cartExistingItemIndex];

  if(cartExistingItem) {
      if(cartExistingItem?.quantity === 1) {
        // quantity is 1, so remove the item from cart; 
        const updatedCartItems = cartItems.filter((item) => item.id !== productToRemove.id);

        return updatedCartItems;
      } else {
        let updatedItems;
        const updatedItem = {
          ...cartExistingItem,
          quantity: cartExistingItem.quantity - 1
        };

        updatedItems = [...cartItems];
        updatedItems[cartExistingItemIndex] = updatedItem;

        return updatedItems
      }
  }

};


export const clearCartItem = (cartItems,productToRemove) => {
  const updatedItems = cartItems.filter(item => item.id !== productToRemove.id);

  return updatedItems;
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemCount: 0,
});

const CartContextProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartPrice,setCartPrice] = useState(0);

  // Calculate items from cart
  useEffect(() => {
    const itemsCount = cartItems.reduce(
      (acc, item) => (acc += item.quantity),
      0
    );
    setCartItemCount(itemsCount);
  }, [cartItems]);

  // Calculate cart price; 
  useEffect(() => {
    const calcCartPrice = cartItems.reduce((acc,el) => {
      return acc += ( el.quantity * el.price);
    },0) 

    setCartPrice(calcCartPrice);

  },[cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product));
  };

  const clearItemFromCart = (product) => {
    setCartItems(clearCartItem(cartItems, product));
  }

  const context = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemCount,
    removeItemFromCart,
    clearItemFromCart,
    cartPrice
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
