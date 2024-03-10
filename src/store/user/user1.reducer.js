import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAuthenticated: null,
  paymentSession: null,
};

export const userSlice = createSlice({
  name: "user1",
  initialState: INITIAL_STATE,
  reducers: {
    checkout(state, action) {
      state.isLoading = false;
      state.paymentSession = action.payload;
    },

    checkoutStart(state) {
      state.isLoading = true;
    },
    signUp(state, action) {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    login(state, action) {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    userSignUpStart(state) {
      state.isLoading = true;
    },
    loginStart(state) {
      state.isLoading = true;
    },
    signout(state) {
      state.isLoading = false;
      state.currentUser = null;
      state.isAuthenticated = null;
      Cookies.remove("token");
      Cookies.remove("refreshToken");
    },
  },
});

console.log(userSlice);

export const {
  signUp,
  userSignUpStart,
  loginStart,
  login,
  signout,
  checkoutStart,
  checkout,
} = userSlice.actions;

export const user1Reducer = userSlice.reducer;
