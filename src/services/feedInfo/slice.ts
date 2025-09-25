import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '../../utils/types';
import { FeedInfoAction, OrderByNumberAction } from './actions';

type TFeedState = TOrdersData & {
  isLoading: boolean;
  currentOrder: TOrder | null;
  error: string | null;
  currentOrderError: string | null;
};

const initialState: TFeedState = {
  total: 0,
  totalToday: 0,
  orders: [],
  isLoading: false,
  currentOrder: null,
  error: null,
  currentOrderError: null
};

export const feedSlice = createSlice({
  name: 'feedInfo',
  initialState,
  reducers: {
    setAllOrders: (state, action) => {
      state.orders = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setTotalToday: (state, action) => {
      state.totalToday = action.payload;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrderError: (state) => {
      state.currentOrderError = null;
    },
    clearAllErrors: (state) => {
      state.error = null;
      state.currentOrderError = null;
    }
  },
  selectors: {
    getAllOrders: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getCurrentOrder: (state) => state.currentOrder,
    getError: (state) => state.error,
    getCurrentOrderError: (state) => state.currentOrderError
  },
  extraReducers: (builder) => {
    builder
      .addCase(FeedInfoAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(FeedInfoAction.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(FeedInfoAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error?.message ||
          'Произошла ошибка при загрузке ленты заказов';
      })
      .addCase(OrderByNumberAction.pending, (state) => {
        state.isLoading = true;
        state.currentOrderError = null;
      })
      .addCase(OrderByNumberAction.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.isLoading = false;
        state.currentOrderError = null;
      })
      .addCase(OrderByNumberAction.rejected, (state, action) => {
        state.isLoading = false;
        state.currentOrderError =
          action.error?.message || 'Произошла ошибка при загрузке заказа';
      });
  }
});

export const {
  setAllOrders,
  setIsLoading,
  setTotal,
  setTotalToday,
  setCurrentOrder,
  clearError,
  clearCurrentOrderError,
  clearAllErrors
} = feedSlice.actions;

export const {
  getAllOrders,
  getIsLoading,
  getTotal,
  getTotalToday,
  getCurrentOrder,
  getError,
  getCurrentOrderError
} = feedSlice.selectors;
