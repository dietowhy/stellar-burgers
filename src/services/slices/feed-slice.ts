import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TFeedState } from '@utils-types';
import { getFeedsApi } from '@api';

export const getFeeds = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  selectors: {
    feedSelector: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    }),
    feedOrdersSelector: (state) => state.orders,
    feedIsLoadingSelector: (state) => state.loading,
    feedErrorSelector: (state) => state.error
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

export const feedReducer = feedSlice.reducer;

export const {
  feedOrdersSelector,
  feedIsLoadingSelector,
  feedErrorSelector,
  feedSelector
} = feedSlice.selectors;
