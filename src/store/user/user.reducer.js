import { USER_ACTION_TYPES } from "./user.types";
import Cookies from "js-cookie";

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAuthenticated: localStorage.getItem("isAuthenticated"),
};

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      return { ...state, currentUser: payload, isAuthenticated: true };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      localStorage.setItem("isAuthenticated", JSON.stringify(false));
      return { ...state, currentUser: null, isAuthenticated: false };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
