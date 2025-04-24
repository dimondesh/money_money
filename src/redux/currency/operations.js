import { createAsyncThunk } from '@reduxjs/toolkit';

// Поки що фейкові дані
const fakeRates = [
  { ccy: 'USD', base_ccy: 'UAH', buy: '38.40', sale: '39.10' },
  { ccy: 'EUR', base_ccy: 'UAH', buy: '41.20', sale: '42.00' },
  { ccy: 'PLN', base_ccy: 'UAH', buy: '9.10', sale: '9.30' },
];

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchCurrencyRates',
  async () => {
    // TODO: замінити на справжній API
    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeRates), 500);
    });
  }
);
