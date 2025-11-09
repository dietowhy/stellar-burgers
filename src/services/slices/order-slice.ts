import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrderState } from '@utils-types';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';

export const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  orders: [],
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk(
  'userOrders/fetchUserOrders',
  getOrdersApi
);

export const getOrderBurger = createAsyncThunk(
  'user/newUserOrder',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    orderRequestSelector: (state) => state.orderRequest,
    orderModalDataSelector: (state) => state.orderModalData,
    orderErrorSelector: (state) => state.error,
    ordersSelector: (state) => state.orders,
    loadingSelector: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(getOrderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message as string;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const {
  orderRequestSelector,
  orderModalDataSelector,
  orderErrorSelector,
  ordersSelector,
  loadingSelector
} = orderSlice.selectors;
