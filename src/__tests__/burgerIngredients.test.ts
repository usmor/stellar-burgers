import { expect, test, describe } from '@jest/globals';
import { burgerIngredientsSlice } from '../services/burgerIngredients/slice';
import mockIngredients from '../utils/mocks/mockIngredients.json';
import { IngredientsAction } from '../services/burgerIngredients/actions';

describe('тест burgerIngredientsSlice', () => {
  const initialBurgerState = {
    ingredients: null,
    isLoading: false,
    error: null
  };

  describe('тесты получения ингредиентов', () => {
    test('успешный запрос IgredientsAction', () => {
      const action = {
        type: IngredientsAction.fulfilled.type,
        payload: mockIngredients
      };
      const state = burgerIngredientsSlice.reducer(initialBurgerState, action);

      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    test('запрос в процессе выполнения', () => {
      const action = { type: IngredientsAction.pending.type };
      const state = burgerIngredientsSlice.reducer(initialBurgerState, action);

      expect(state.ingredients).toBeNull();
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('ошибка запроса IngredientsAction', () => {
      const errorMessage = 'Ошибка загрузки ингредиентов';
      const action = {
        type: IngredientsAction.rejected.type,
        error: { message: errorMessage }
      };
      const state = burgerIngredientsSlice.reducer(initialBurgerState, action);

      expect(state.ingredients).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('тесты синхронных экшенов', () => {
    test('установка ингредиентов', () => {
      const action =
        burgerIngredientsSlice.actions.setIngredients(mockIngredients);
      const state = burgerIngredientsSlice.reducer(initialBurgerState, action);

      expect(state.ingredients).toEqual(mockIngredients);
    });

    test('установка состояния загрузки', () => {
      const action = burgerIngredientsSlice.actions.setIsLoading(true);
      const state = burgerIngredientsSlice.reducer(initialBurgerState, action);

      expect(state.isLoading).toBe(true);
    });

    test('очистка ошибки', () => {
      const stateWithError = {
        ...initialBurgerState,
        error: 'Ошибка загрузки'
      };
      const action = burgerIngredientsSlice.actions.clearError();
      const state = burgerIngredientsSlice.reducer(stateWithError, action);

      expect(state.error).toBeNull();
    });
  });
});
