// features/product/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductRequest, fetchProductSuccess, fetchProductFailure } =
  productSlice.actions;

export const productReducer = productSlice.reducer;
