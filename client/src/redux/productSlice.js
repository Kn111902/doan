import { createSlice } from "@reduxjs/toolkit";
import {
  getProduct,
  getProductActive,
  getProductByCategory,
  getProductByName,
  getProductByPrice,
  getProductByTitle,
  getProductByUserId,
} from "./productAction";

const initialState = {
  count: 0,
  loading: false,
  products: [],
  productSearch: [],
  message: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.products = payload.data;
        state.message = payload?.message;
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getProductActive.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getProductActive.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.products = payload.data;
        state.message = payload?.message;
      })
      .addCase(getProductActive.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getProductByCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.products = payload.data;
        state.message = payload?.message;
      })
      .addCase(getProductByCategory.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getProductByName.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getProductByName.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.products = payload.data;
        state.message = payload?.message;
      })
      .addCase(getProductByName.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getProductByPrice.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getProductByPrice.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.products = payload.data;
        state.message = payload?.message;
      })
      .addCase(getProductByPrice.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getProductByUserId.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getProductByUserId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.products = payload.data;
        state.message = payload?.message;
      })
      .addCase(getProductByUserId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getProductByTitle.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getProductByTitle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.productSearch = payload.data;
        state.message = payload?.message;
      })
      .addCase(getProductByTitle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      });
  },
});

export default productSlice.reducer;
