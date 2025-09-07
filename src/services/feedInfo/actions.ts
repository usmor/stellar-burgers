import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';

export const FeedInfoAction = createAsyncThunk(
  'feedInfo/getFullInfo',
  async () => getFeedsApi()
);

export const OrderByNumberAction = createAsyncThunk(
  'feedInfo/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);
