import { expect, test, describe } from '@jest/globals';
import {
  FeedInfoAction,
  OrderByNumberAction
} from '../services/feedInfo/actions';
import { feedSlice } from '../services/feedInfo/slice';
import mockFeedInfo from '../utils/mocks/mockFeedInfo.json';
import mockOrder from '../utils/mocks/mockOrder.json';
import mockOrders from '../utils/mocks/mockOrders.json';

describe('тест feedSlice', () => {
  const intialFeedState = {
    total: 0,
    totalToday: 0,
    orders: [],
    isLoading: false,
    currentOrder: null,
    error: null,
    currentOrderError: null
  };

  describe('тесты получения данных ленты заказов', () => {
    test('успешное выполнение запроса FeedInfoAction', () => {
      const action = {
        type: FeedInfoAction.fulfilled.type,
        payload: mockFeedInfo
      };

      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...mockFeedInfo,
        isLoading: false,
        currentOrder: null,
        error: null,
        currentOrderError: null
      });
    });

    test('запрос FeedInfoAction в процессе выполнения', () => {
      const action = {
        type: FeedInfoAction.pending.type
      };

      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        isLoading: true
      });
    });

    test('ошибка запроса FeedInfoAction', () => {
      const errorMessage = 'Ошибка загрузки ленты заказов';
      const action = {
        type: FeedInfoAction.rejected.type,
        error: { message: errorMessage }
      };

      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        error: errorMessage
      });
    });
  });

  describe('тесты на получения заказа по number', () => {
    test('успешное выполнение запроса OrderByNumberAction', () => {
      const action = {
        type: OrderByNumberAction.fulfilled.type,
        payload: mockOrder
      };

      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        currentOrder: mockOrder
      });
    });

    test('запрос OrderByNumberAction в процессе выполнения', () => {
      const action = {
        type: OrderByNumberAction.pending.type
      };

      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        isLoading: true
      });
    });

    test('ошибка запроса OrderByNumberAction', () => {
      const errorMessage = 'Ошибка загрузки заказа';
      const action = {
        type: OrderByNumberAction.rejected.type,
        error: { message: errorMessage }
      };

      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        currentOrderError: errorMessage
      });
    });
  });

  describe('тесты синхронных экшенов', () => {
    test('установка всех заказов', () => {
      const orders = mockOrders;
      const action = feedSlice.actions.setAllOrders(orders);
      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        orders: mockOrders
      });
    });

    test('установка состояния загрузки', () => {
      const action = feedSlice.actions.setIsLoading(true);
      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        isLoading: true
      });
    });

    test('установка общего количества заказов', () => {
      const action = feedSlice.actions.setTotal(100);
      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        total: 100
      });
    });

    test('установка количества заказов за сегодня', () => {
      const action = feedSlice.actions.setTotalToday(50);
      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        totalToday: 50
      });
    });

    test('установка текущего заказа', () => {
      const order = mockOrder;
      const action = feedSlice.actions.setCurrentOrder(order);
      const state = feedSlice.reducer(intialFeedState, action);

      expect(state).toEqual({
        ...intialFeedState,
        currentOrder: mockOrder
      });
    });

    test('очистка ошибки ленты заказов', () => {
      const stateWithError = {
        ...intialFeedState,
        error: 'Ошибка ленты'
      };
      const action = feedSlice.actions.clearError();
      const state = feedSlice.reducer(stateWithError, action);

      expect(state).toEqual(intialFeedState);
    });

    test('очистка ошибки заказа', () => {
      const stateWithError = {
        ...intialFeedState,
        currentOrderError: 'Ошибка заказа'
      };
      const action = feedSlice.actions.clearCurrentOrderError();
      const state = feedSlice.reducer(stateWithError, action);

      expect(state).toEqual(intialFeedState);
    });

    test('очистка всех ошибок', () => {
      const stateWithErrors = {
        ...intialFeedState,
        error: 'Ошибка ленты',
        currentOrderError: 'Ошибка заказа'
      };
      const action = feedSlice.actions.clearAllErrors();
      const state = feedSlice.reducer(stateWithErrors, action);

      expect(state).toEqual(intialFeedState);
    });
  });
});
