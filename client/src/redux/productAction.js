import { createAsyncThunk } from "@reduxjs/toolkit";
import productRest from "../api/ProductRest";

export const getProduct = createAsyncThunk(
  "getProduct/productSlice",
  async (params) => {
    try {
      const res = await productRest.getProducts(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const getProductActive = createAsyncThunk(
  "getProductActive/productSlice",
  async (params) => {
    try {
      const res = await productRest.getProductActive(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const getProductByCategory = createAsyncThunk(
  "getProductByCategory/productSlice",
  async (params) => {
    try {
      const res = await productRest.getProductByCategory(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const getProductById = async (id) => {
  try {
    const res = await productRest.getProductById(id);
    return res.data;
  } catch (error) {
    console.log("🚀 ~ getProduct ~ error:", error);
  }
};

export const getProductByName = createAsyncThunk(
  "getProductByName/productSlice",
  async (params) => {
    try {
      const res = await productRest.getProductByName(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const getProductByUserId = createAsyncThunk(
  "getProductByUserId/productSlice",
  async (params) => {
    console.log("🚀 ~ getProductByUserId ~ params:", params);
    try {
      const res = await productRest.getProductByUserId(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);

export const getProductByTitle = createAsyncThunk(
  "getProductByTitle/productSlice",
  async (params) => {
    try {
      const res = await productRest.getProductByName(params);
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);
export const getProductByPrice = createAsyncThunk(
  "getProductByPrice/productSlice",
  async (prices) => {
    try {
      const res = await productRest.getProductByPrice({
        minPrice: prices[0] ? prices[0] : 0,
        maxPrice: prices[1] ? prices[1] : 20000000,
      });
      return res;
    } catch (error) {
      console.log("🚀 ~ getProduct ~ error:", error);
    }
  }
);
