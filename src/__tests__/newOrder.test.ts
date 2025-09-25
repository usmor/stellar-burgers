import { expect, test, describe } from '@jest/globals';
import { createOrder } from '../services/newOrder/actions';
import { orderSlice } from '../services/newOrder/slice';
import mockOrder from '../utils/mocks/mockOrder.json';

describe('тест orderSlice', () => {
  const initialNewOrderState = {
    currentOrder: null,
    isLoading: false,
    error: null
  };
  describe('тесты создания заказа', () => {
    test('успешный запрос createOrder', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderSlice.reducer(initialNewOrderState, action);

      expect(state.currentOrder).toEqual(mockOrder);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('запрос в процессе выполнения', () => {
      const action = { type: createOrder.pending.type };
      const state = orderSlice.reducer(initialNewOrderState, action);

      expect(state.currentOrder).toBeNull();
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('ошибка запроса createOrder', () => {
      const errorMessage = 'Ошибка создания заказа';
      const action = {
        type: createOrder.rejected.type,
        error: { message: errorMessage }
      };
      const state = orderSlice.reducer(initialNewOrderState, action);

      expect(state.currentOrder).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('тесты синхронных экшенов', () => {
    test('тест очистки заказа', () => {
      const stateWithOrder = {
        currentOrder: mockOrder,
        isLoading: false,
        error: null
      };

      const action = orderSlice.actions.clearOrder();
      const state = orderSlice.reducer(stateWithOrder, action);

      expect(state.currentOrder).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('тест очистки ошибки', () => {
      const stateWithError = {
        currentOrder: mockOrder,
        isLoading: false,
        error: 'Какая-то ошибка'
      };

      const action = orderSlice.actions.clearOrder();
      const state = orderSlice.reducer(stateWithError, action);

      expect(state.currentOrder).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Какая-то ошибка');
    });
  });
});
