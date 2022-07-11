import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { RootState } from "../store";
// receive cart slice
const selectCartReducer = (state : RootState) : CartState => state.cart;

// get the cart items;
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// select if cart is open flag from reducer
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// select cart count based on cartItems from reducer
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => (acc += item.quantity), 0)
);


// select cart total price based on cartItems from reducer
export const selectCartTotalPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => (acc += item.quantity * item.price), 0)
);