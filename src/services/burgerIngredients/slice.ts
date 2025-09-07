import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { IngredientsAction } from './actions';

type TBurgerIngredientsState = {
  ingredients: TIngredient[] | null;
  isLoading: boolean;
};

const initialState: TBurgerIngredientsState = {
  ingredients: null,
  isLoading: false
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
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(IngredientsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(IngredientsAction.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(IngredientsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { setIngredients, setIsLoading } = burgerIngredientsSlice.actions;
export const { getIngredients, getIsLoading } =
  burgerIngredientsSlice.selectors;
