import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { IngredientsAction } from './actions';

type TBurgerIngredientsState = {
  ingredients: TIngredient[] | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TBurgerIngredientsState = {
  ingredients: null,
  isLoading: false,
  error: null
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(IngredientsAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(IngredientsAction.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(IngredientsAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = state.error =
          action.error?.message || 'Произошла ошибка при загрузке ингредиентов';
      });
  }
});

export const { setIngredients, setIsLoading, clearError } =
  burgerIngredientsSlice.actions;
export const { getIngredients, getIsLoading, getError } =
  burgerIngredientsSlice.selectors;
