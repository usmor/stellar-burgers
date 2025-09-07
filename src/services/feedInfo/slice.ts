import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '../../utils/types';
import { FeedInfoAction, OrderByNumberAction } from './actions';

type TFeedState = TOrdersData & {
  isLoading: boolean;
  currentOrder: TOrder | null;
};

const initialState: TFeedState = {
  total: 0,
  totalToday: 0,
  orders: [],
  isLoading: false,
  currentOrder: null
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
    }
  },
  selectors: {
    getAllOrders: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getCurrentOrder: (state) => state.currentOrder
  },
  extraReducers: (builder) => {
    builder
      .addCase(FeedInfoAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FeedInfoAction.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(FeedInfoAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(OrderByNumberAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(OrderByNumberAction.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.isLoading = false;
      })
      .addCase(OrderByNumberAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const {
  setAllOrders,
  setIsLoading,
  setTotal,
  setTotalToday,
  setCurrentOrder
} = feedSlice.actions;
export const {
  getAllOrders,
  getIsLoading,
  getTotal,
  getTotalToday,
  getCurrentOrder
} = feedSlice.selectors;
