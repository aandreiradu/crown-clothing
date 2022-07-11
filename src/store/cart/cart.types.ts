// export const CART_ACTION_TYPES = {
//     'SET_CART_ITEMS' : 'cart/SET_CART_ITEMS',
//     'SET_IS_CART_OPEN' : 'cart/SET_IS_CART_OPEN',
//     'SET_CART_COUNT' : 'cart/SET_CART_COUNT',
//     'SET_CART_TOTAL' : 'cart/SET_CART_TOTAL',
//     'CLEAR_CART_AFTER_PAYMENT' : 'cart/CLEAR_CART_AFTER_PAYMENT'
// };

import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
  "SET_CART_ITEMS" = "cart/SET_CART_ITEMS",
  "SET_IS_CART_OPEN" = "cart/SET_IS_CART_OPEN",
  "SET_CART_COUNT" = "cart/SET_CART_COUNT",
  "SET_CART_TOTAL" = "cart/SET_CART_TOTAL",
  "CLEAR_CART_AFTER_PAYMENT" = "cart/CLEAR_CART_AFTER_PAYMENT",
}

export type CartItem = {
    quantity: number;
  } & CategoryItem;
