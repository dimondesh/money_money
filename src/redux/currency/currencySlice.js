import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrencyRates } from './operations';

const initialState = {
  rates: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencyRates.fulfilled, (state, { payload }) => {
      state.rates = payload;
    });
  },
});

export const currencyReducer = currencySlice.reducer;
