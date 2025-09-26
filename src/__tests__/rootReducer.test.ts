import { expect, test, describe } from '@jest/globals';
import { rootReducer } from '../services/store';

describe('тесты корневого редьюсера', () => {
  test('тест на инициализацию', () => {
    const resultState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(resultState).toEqual({
      burgerIngredients: {
        ingredients: null,
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      feedInfo: {
        total: 0,
        totalToday: 0,
        orders: [],
        isLoading: false,
        currentOrder: null,
        error: null,
        currentOrderError: null
      },
      order: {
        currentOrder: null,
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        userOrders: [],
        error: null
      }
    });
  });
});
