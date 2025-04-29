export const selectTransactions = (state) => state.transactions.transactions;
export const selectBalance = (state) => state.transactions.balance;

export const selectLoading = (state) => state.transactions.loading;
export const selectError = (state) => state.transactions.error;
