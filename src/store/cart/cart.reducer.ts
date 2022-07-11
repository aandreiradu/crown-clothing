import { CartItem, CART_ACTION_TYPES } from "./cart.types";
import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen,setCartItemsAfterPayment } from "./cart.actions";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  // const { type, payload } = action;

  // switch (type) {
    // case CART_ACTION_TYPES.SET_CART_ITEMS:
    //   return {
    //     ...state,
    //     cartItems: payload,
    //   };

    // case CART_ACTION_TYPES.SET_IS_CART_OPEN:
    //   return {
    //     ...state,
    //     isCartOpen: payload,
    //   };

  //   case CART_ACTION_TYPES.CLEAR_CART_AFTER_PAYMENT:
  //     return {
  //       ...state,
  //       cartItems: [],
  //     };

  //   default:
  //     return state;
  // }

  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if(setCartItemsAfterPayment.match(action)){
    console.log('setCartItemsAfterPayment matched with action', action);
    return {
      ...state,
      cartItems: []
    }
  }


  return state;
};
