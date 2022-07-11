import { CART_ACTION_TYPES } from "./cart.types";

import {
  setIsCartOpen,
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
  clearCartAfterPayment,
} from "./cart.actions";

describe("toggle setIsCartOpen action", () => {
  it("should create the setIsCartopen action", () => {
    expect(setIsCartOpen().type).toEqual(CART_ACTION_TYPES.SET_IS_CART_OPEN);
  });
});
