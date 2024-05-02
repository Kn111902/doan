import { createSlice } from "@reduxjs/toolkit";
import { getBillByUserId, getBills, getBillsByCus } from "./billAction";

const initialState = {
  count: 0,
  loading: false,
  bills: [],
  billSearch: [],
  message: "",
};

const billSlice = createSlice({
  name: "bill",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBillByUserId.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getBillByUserId.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.bills = payload.data;
        state.message = payload?.message;
      })
      .addCase(getBillByUserId.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getBillsByCus.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getBillsByCus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.billSearch = payload.data;
        state.message = payload?.message;
      })
      .addCase(getBillsByCus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(getBills.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getBills.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.bills = payload.data;
        state.message = payload?.message;
      })
      .addCase(getBills.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      });
  },
});

export default billSlice.reducer;
