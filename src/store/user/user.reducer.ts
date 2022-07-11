import USER_ACTION_TYPES from "./user.types";
import { AnyAction } from "redux";
import {
  signInSuccess,
  signOutSuccess,
  signInFailed,
  signOutFailed,
  SignInFailed,
  signUpFailed,
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// without saga
// export const userReducer = (state = USER_INITIAL_STATE, action) => {
//   const { type, payload } = action;

// switch (type) {
//   case USER_ACTION_TYPES.SET_CURRENT_USER:
//     return { ...state, currentUser: payload };

//   default:
//     return state;
// }
// };

// with saga
export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
  // const { type, payload } = action;

  // switch (type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return { ...state, currentUser: payload, isLoading: false };

  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return { ...state, currentUser: null, isLoading: false };

  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //     return { ...state, error: payload, isLoading: false };

  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //     return { ...state, error: payload, isLoading: false };

  //   default:
  //     return state;
  // }

  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload, isLoading: false };
  }

  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null, isLoading: false };
  }

  if (signInFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  if (
    signOutFailed.match(action) ||
    signInFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
