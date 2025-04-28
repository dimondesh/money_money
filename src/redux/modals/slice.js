import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddModalOpen: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openAddModal(state) {
      state.isAddModalOpen = true;
    },
    closeAddModal(state) {
      state.isAddModalOpen = false;
    },
  },
});

export const {
  openAddModal,
  closeAddModal,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;