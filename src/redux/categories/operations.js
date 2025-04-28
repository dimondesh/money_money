import { createAsyncThunk } from "@reduxjs/toolkit";
import { walletAPI } from "../../helpers";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await walletAPI.get("/categories");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
