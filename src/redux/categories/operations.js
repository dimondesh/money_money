import { createAsyncThunk } from "@reduxjs/toolkit";
import { walletAPI } from "../../helpers/api";

export const getCategories = createAsyncThunk(
  "categories",
  async (_, thunkApi) => {
    try {
      const { data } = await walletAPI.get("/api/categories");
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.message || "Failed to fetch categories"
      );
    }
  }
);
