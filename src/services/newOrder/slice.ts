import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder } from './actions';

type TOrderState = {
  currentOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TOrderState = {
  currentOrder: null,
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    getOrder: (state) => state.currentOrder,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error?.message || 'Произошла ошибка при создании заказа';
      });
  }
});

export const { getOrder, getIsLoading, getError } = orderSlice.selectors;
export const { clearOrder, clearError } = orderSlice.actions;
