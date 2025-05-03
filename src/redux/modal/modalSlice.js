import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalAddTransactionOpen: false,
  isModalEditTransactionOpen: false,
  editTransactionId: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModalAddTransaction(state) {
      state.isModalAddTransactionOpen = true;
    },
    closeModalAddTransaction(state) {
      state.isModalAddTransactionOpen = false;
    },
    openModalEditTransaction(state, action) {
      state.isModalEditTransactionOpen = true;
      state.editTransactionId = action.payload || null;
    },
    closeModalEditTransaction(state) {
      state.isModalEditTransactionOpen = false;
      state.editTransactionId = null;
    },
  },
});

export const {
  openModalAddTransaction,
  closeModalAddTransaction,
  openModalEditTransaction,
  closeModalEditTransaction,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;

export const selectTransactionId = (state) => state.modal.editTransactionId;
