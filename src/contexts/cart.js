import { createContext, useReducer } from "react";
import { createAction } from '../utils/reducer/reducer.utils'

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
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartItemCount: 0,
  cartPrice: 0,
});


const CART_ACTION_TYPES = {
    'SET_CART_ITEMS' : 'SET_CART_ITEMS',
    'SET_IS_CART_OPEN' : 'SET_IS_CART_OPEN'
} 

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartPrice: 0
};


const cartReducer = (state,action) => {

  switch (action.type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...action.payload,
      };

    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: action.payload,
      };

    default:
      throw new Error(`Unhandled type of ${action.type} in cartReducer`);
  }
}

const CartContextProvider = (props) => {
  const [{isCartOpen,cartItems,cartItemCount,cartPrice},dispatch] = useReducer(cartReducer,INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {

    // update items count from cart
    const itemsCount = newCartItems.reduce(
      (acc, item) => (acc += item.quantity),
      0
    );

    // update cart price
    const calcCartPrice = newCartItems.reduce((acc,el) => {
      return acc += ( el.quantity * el.price);
    },0);


    // dispatch
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartItemCount: itemsCount,
        cartPrice: calcCartPrice,
      })
    );

  }

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
      dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool));
  }

  const context = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItemCount,
    cartPrice
  };

  return (
    <CartContext.Provider value={context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
