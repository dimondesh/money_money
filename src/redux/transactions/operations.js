import { createAsyncThunk } from "@reduxjs/toolkit";

import { walletAPI } from "helpers/api";
import { getBalanceThunk } from "../auth/operations";

export const getTransactions = createAsyncThunk(
  "transactions/all",
  async (_, thunkApi) => {
    try {
      const { data } = await walletAPI.get("/api/transactions");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addTransactions = createAsyncThunk(
  "transactions/add",
  async (transaction, thunkApi) => {
    try {
      const { data } = await walletAPI.post("/api/transactions", transaction);
      console.log("Відповідь з бекенду:", data);
      thunkApi.dispatch(getBalanceThunk());
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTransactions = createAsyncThunk(
  "transactions/delete",
  async (id, thunkApi) => {
    try {
      await walletAPI.delete(`/api/transactions/${id}`);
      thunkApi.dispatch(getBalanceThunk());
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editTransactions = createAsyncThunk(
  "transactions/edit",
  async ({ id, updatedTransaction }, thunkApi) => {
    try {
      const { data } = await walletAPI.patch(
        `/api/transactions/${id}`,
        updatedTransaction
      );

      thunkApi.dispatch(getBalanceThunk());
      thunkApi.dispatch(getTransactions());
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
