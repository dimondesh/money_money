import { createAsyncThunk } from "@reduxjs/toolkit";
import { walletAPI } from "../../helpers/index.js";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await walletAPI.get("api/transactions");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const formattedData = {
        type: transactionData.type,
        category: transactionData.category,
        sum: Number(transactionData.sum),
        comment: transactionData.comment || "",

        // date: transactionData.date || new Date().toISOString(),
      };

      const response = await walletAPI.post("api/transactions", formattedData);

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error("Error", errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (transactionId, { rejectWithValue }) => {
    try {
      await walletAPI.delete(`api/transactions/${transactionId}`);
      return transactionId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
