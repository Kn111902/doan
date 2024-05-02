import { createAsyncThunk } from "@reduxjs/toolkit";
import billRest from "../api/BillRest";

export const getBillByUserId = createAsyncThunk(
  "getBillByUserId/billSlice",
  async (params) => {
    try {
      const res = await billRest.getBillByUserId(params);
      console.log("🚀 ~ res:", res);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const getBills = createAsyncThunk(
  "getBill/billSlice",
  async (params) => {
    try {
      const res = await billRest.getBills(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const getBillsByCus = createAsyncThunk(
  "getBillsByCus/billSlice",
  async (keyword) => {
    try {
      const res = await billRest.getBillByCus({ keyword });
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);
