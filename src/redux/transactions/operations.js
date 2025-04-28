import { createAsyncThunk } from "@reduxjs/toolkit";
import { walletAPI, setToken } from "../../helpers/api.js";
import { toast } from "react-toastify";

export const getTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;

    if (!savedToken) {
      return thunkApi.rejectWithValue("Token doesn't exist");
    }
    setToken(savedToken);

    try {
      const response = await walletAPI.get("/api/transactions");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || "Failed to fetch transactions";
      toast.error(message);
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getTransactionsCategories = createAsyncThunk(
  'transactions/getCategories',
  async (_, thunkApi) => {
     const savedToken = thunkApi.getState().auth.token;
     if (!savedToken) { return thunkApi.rejectWithValue("Token doesn't exist"); }
     setToken(savedToken);
     try {
       const response = await walletAPI.get("/api/transaction-categories");
       return response.data;
     } catch (error) {
       const message = error.response?.data?.message || error.message || "Failed to fetch categories";
       toast.error(message);
       return thunkApi.rejectWithValue(message);
     }
  }
);