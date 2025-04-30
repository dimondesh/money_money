export const selectTransactions = (state) => state.transactions.transactions;
export const selectBalance = (state) => state.transactions.currentTransaction;

export const selectLoading = (state) =>
  state.transactions.isTransactionsLoading;
export const selectError = (state) => state.transactions.isTransactionsError;
