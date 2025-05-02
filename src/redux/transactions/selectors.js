export const selectSummary = (state) => state.statistics.summary;
// export const selectCategories = (state) => state.statistics.categories;

export const selectStatLoading = (state) =>
  state.statistics.isStatisticsLoading;

export const selectStatError = (state) => state.statistics.isStatisticsError;

export const selectIncomeSummaryByPeriod = (state) =>
  state.statistics.incomeSummaryByPeriod;

export const selectExpenseSummaryByPeriod = (state) =>
  state.statistics.expenseSummaryByPeriod;

export const selectTransactions = (state) => state.transactions.transactions;
export const selectBalance = (state) => state.transactions.currentTransaction;

export const selectLoading = (state) => state.transactions.isTransactionsLoading;
export const selectError = (state) => state.transactions.isTransactionsError;

export const selectCurrentTransaction = (state) => ({
  transaction: state.transactions.transactionForUpdate,
});
