import { createSlice } from "@reduxjs/toolkit";

import { fetchCategories } from "../../redux/categories/operations";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
} from "./operations";

const initialState = {
  transactions: [],
  loading: false,
  error: null,
  balance: 0,
  categories: [],
  trasactionIdForDelete: "",
  transactionForUpdate: {
    id: "",
    type: "",
  },
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTrasactionIdForDelete: (state, action) => {
      state.trasactionIdForDelete = action.payload;
    },
    setTrasactionForUpdate: (state, action) => {
      state.transactionForUpdate = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload.transactions;
        state.balance = action.payload.balance;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload && action.payload.transaction) {
          state.transactions.push(action.payload.transaction);

          if (action.payload.hasOwnProperty("balance")) {
            state.balance = action.payload.balance;
          }
        } else if (action.payload) {
          state.transactions.push(action.payload);

          if (action.payload.hasOwnProperty("balance")) {
            state.balance = action.payload.balance;
          }
        }
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;

        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        );

        if (action.payload && action.payload.hasOwnProperty("balance")) {
          state.balance = action.payload.balance;
        }
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTrasactionIdForDelete, setTrasactionForUpdate } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
