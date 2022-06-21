import USER_ACTION_TYPES from "./user.types";

export const USER_INITIAL_STATE = {
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
export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload, isLoading: false };

    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, isLoading: false };

    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return { ...state, error: payload, isLoading: false };

    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return { ...state, error: payload, isLoading: false };

    default:
      return state;
  }
};
