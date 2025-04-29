<<<<<<< HEAD
export const selectCategories = (state) => state.categories.categories;
export const selectCategoriesLoading = (state) => state.categories.loading;
=======
export const selectCategories = (state) => state.categories;

export const selectLoading = (state) => state.categories.isLoading;
export const selectError = (state) => state.categories.isError;
>>>>>>> main
