import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD


// const categoriesSlice = createSlice({
//   name: "categories",
//   initialState: {
//     categories: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.categories = action.payload;
//       })
//       .addCase(fetchCategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
=======
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
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.categories = payload;
      })

      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
>>>>>>> main
      });
  },
});

<<<<<<< HEAD
// export default categoriesSlice.reducer;
=======
export const categoriesReducer = slice.reducer;
>>>>>>> main
