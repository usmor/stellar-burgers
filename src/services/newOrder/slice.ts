import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createOrder } from './actions';

type TOrderState = {
  currentOrder: TOrder | null;
  isLoading: boolean;
};

const initialState: TOrderState = {
  currentOrder: null,
  isLoading: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    getOrder: (state) => state.currentOrder,
    getIsLoading: (state) => state.isLoading
  },
  reducers: {
    clearOrder: (state) => {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { getOrder, getIsLoading } = orderSlice.selectors;
export const { clearOrder } = orderSlice.actions;
