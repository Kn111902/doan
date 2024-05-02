import { createSlice } from "@reduxjs/toolkit";
import { getUserList, searchCusAct } from "./userAction";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  userList: [],
  userSearch: [],
  loading: false,
  count: 0,
};

const authSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
    },
    update: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(getUserList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.userList = payload.data;
        state.message = payload?.message;
      })
      .addCase(getUserList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      })
      .addCase(searchCusAct.pending, (state) => {
        state.loading = true;
        state.message = "PENDING";
      })
      .addCase(searchCusAct.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.count = payload.count;
        state.userList = payload.data;
        state.message = payload?.message;
      })
      .addCase(searchCusAct.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload?.message;
      });
  },
});

export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;
