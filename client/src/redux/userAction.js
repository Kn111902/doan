import authRest from "../api/AuthRest";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUserList = createAsyncThunk(
  "getUserList/authSlice",
  async (params) => {
    try {
      const res = await authRest.getUserList(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const searchCusAct = createAsyncThunk(
  "searchCusAct/authSlice",
  async (params) => {
    try {
      const res = await authRest.getCusList(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);
