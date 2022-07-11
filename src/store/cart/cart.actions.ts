import { useCallback } from "react";
import { createAction,withMatcher,Action,ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES,CartItem } from "./cart.types";
import { Category, CategoryItem } from "../categories/categories.types";

// HELPERS AREA


const addCartItem = (cartItems:CartItem[] , productToAdd : CartItem) : CartItem[] => {
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

const removeCartItem = (cartItems : CartItem[], productToRemove : CartItem) : CartItem[] => {
  // find index of item;
  const cartExistingItemIndex = cartItems.findIndex(
    (item) => item.id === productToRemove.id
  );
  const cartExistingItem = cartItems[cartExistingItemIndex];

    if (cartExistingItem && cartExistingItem.quantity === 1) {
      // quantity is 1, so remove the item from cart;
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== productToRemove.id
      );

      return updatedCartItems;
    } else {
      let updatedItems;
      const updatedItem = {
        ...cartExistingItem,
        quantity: cartExistingItem.quantity - 1,
      };

      updatedItems = [...cartItems];
      updatedItems[cartExistingItemIndex] = updatedItem;

      return updatedItems;
    }
};

const clearCartItem = (cartItems : CartItem[], productToRemove : CartItem) : CartItem[] => {
  const updatedItems = cartItems.filter(
    (item) => item.id !== productToRemove.id
  );

  return updatedItems;
};



export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN,boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS,CartItem[]>;

export type SetCartItemsAfterPayment = Action<CART_ACTION_TYPES.CLEAR_CART_AFTER_PAYMENT>;



// ACTION CREATORS AREA
export const setIsCartOpen = withMatcher((bool : boolean) : SetIsCartOpen =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));

export const setCartItems = withMatcher((cartItems: CartItem[]) : SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS,cartItems));

export const setCartItemsAfterPayment = withMatcher(() : SetCartItemsAfterPayment => createAction(CART_ACTION_TYPES.CLEAR_CART_AFTER_PAYMENT));


export const addItemToCart = (cartItems : CartItem[], product : any /*CategoryItem*/) => {
  const newCartItems = addCartItem(cartItems, product);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems); 
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems : CartItem[], product : any /*CategoryItem*/) => {
  const newCartItems = removeCartItem(cartItems, product);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems : CartItem[], product : any /*CategoryItem*/) => {
  const newCartItems = clearCartItem(cartItems, product);
  // return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
  return setCartItems(newCartItems);
};

export const clearCartAfterPayment = () => {
  // return createAction(CART_ACTION_TYPES.CLEAR_CART_AFTER_PAYMENT); 
  return setCartItemsAfterPayment();

  // return {
    // type: CART_ACTION_TYPES.CLEAR_CART_AFTER_PAYMENT 
  // }
}