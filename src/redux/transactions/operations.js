import { createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD
// import { walletAPI } from "../../helpers/index.js";

// export const fetchTransactions = createAsyncThunk(
//   "transactions/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await walletAPI.get("api/transactions");
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
=======
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
>>>>>>> main
    }
  }
);

<<<<<<< HEAD
// export const addTransaction = createAsyncThunk(
//   "transactions/addTransaction",
//   async (transactionData, { rejectWithValue }) => {
//     try {
//       const formattedData = {
//         type: transactionData.type,
//         category: transactionData.category,
//         sum: Number(transactionData.sum),
//         comment: transactionData.comment || "",

//         // date: transactionData.date || new Date().toISOString(),
//       };

//       const response = await walletAPI.post("api/transactions", formattedData);

//       return response.data;
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || error.message;
//       console.error("Error", errorMessage);
//       return rejectWithValue(errorMessage);
=======
export const addTransactions = createAsyncThunk(
  "transactions/add",
  async (transaction, thunkApi) => {
    try {
      const { data } = await walletAPI.post("/api/transactions", transaction);

      thunkApi.dispatch(getBalanceThunk());
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
>>>>>>> main
    }
  }
);

<<<<<<< HEAD

=======
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
>>>>>>> main
    }
  }
);
