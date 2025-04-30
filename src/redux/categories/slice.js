import { createSlice } from "@reduxjs/toolkit";

import { getCategories } from "./operations";

const initialState = {
  categories: [],
  isLoading: false,
  isError: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })

      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      });
  },
});

export const categoriesReducer = slice.reducer;
