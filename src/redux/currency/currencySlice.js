import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  rates: [],
  lastFetchTime: null,
  isLoading: false,
  error: null,
};

export const fetchCurrencyRates = createAsyncThunk(
  'currency/fetchRates',
  async (_, { dispatch, getState, rejectWithValue }) => {
    const { lastFetchTime: storeLastFetchTime } = getState().currency;
    const cacheKey = 'currencyData';
    let cachedData = null;

    try {
       cachedData = JSON.parse(localStorage.getItem(cacheKey));
    } catch (e) { console.error("Failed to parse currency cache", e); }

    const now = new Date().getTime();
    const cacheValid = cachedData && (now - cachedData.lastFetchTime < 3600000);

    if (cacheValid || (storeLastFetchTime && now - storeLastFetchTime < 3600000)) {
      const ratesToUse = cacheValid ? cachedData.rates : getState().currency.rates;
      const timeToUse = cacheValid ? cachedData.lastFetchTime : storeLastFetchTime;
      if (!getState().currency.rates.length && ratesToUse.length) {
          dispatch(currencySlice.actions.setCurrencyRates({ rates: ratesToUse, lastFetchTime: timeToUse }));
      }
      console.log('Using cached/existing currency data.');
      return ratesToUse;
    }

    console.log('Fetching fresh currency data...');
    try {
      const response = await fetch('https://api.monobank.ua/bank/currency');
      if (!response.ok) {
          if (response.status === 429) {
              console.warn('Monobank API rate limit hit. Using stale data if available.');
              const staleRates = getState().currency.rates.length ? getState().currency.rates : cachedData?.rates;
              if (staleRates) return staleRates;
              throw new Error('Rate limit hit, no stale data available.');
          }
          throw new Error(`Failed to fetch currency: ${response.statusText}`);
      }
      const data = await response.json();
      const filteredRates = data.filter(rate =>
         (rate.currencyCodeA === 840 || rate.currencyCodeA === 978) && rate.currencyCodeB === 980
      );

      const newCache = { rates: filteredRates, lastFetchTime: now };
      localStorage.setItem(cacheKey, JSON.stringify(newCache));
      dispatch(currencySlice.actions.setCurrencyRates(newCache));
      return filteredRates;

    } catch (error) {
      console.error('Error fetching currency:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencyRates(state, action) {
      state.rates = action.payload.rates;
      state.lastFetchTime = action.payload.lastFetchTime;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencyRates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
         state.isLoading = false;
      })
      .addCase(fetchCurrencyRates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch currency rates';
      });
  },
});

export const { setCurrencyRates } = currencySlice.actions; // Експорт потрібного екшену
export default currencySlice.reducer;