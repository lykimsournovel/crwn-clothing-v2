import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
  isAuthenticated: localStorage.getItem("isAuthenticated"),
};

export const userSlice = createSlice({
  name: "user1",
  initialState: INITIAL_STATE,
  reducers: {
    signUp(state, action) {
      console.log(action.payload);
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", state.isAuthenticated);
    },
    userSignUpStart(state) {
      state.isLoading = true;
    },
  },
});

console.log(userSlice);

export const { signUp, userSignUpStart } = userSlice.actions;

export const user1Reducer = userSlice.reducer;
