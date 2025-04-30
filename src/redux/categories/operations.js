import { createAsyncThunk } from "@reduxjs/toolkit";
import { walletAPI } from "../../helpers/api";

export const getCategories = createAsyncThunk(
  "/categories",
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
      return thunkApi.rejectWithValue("No token");
    }

    setToken(savedToken);

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
