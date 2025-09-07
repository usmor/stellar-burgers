import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const BurgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getConstructorItems: (state) => state,
    getBun: (state) => state.bun,
    getBurgerIngredients: (state) => state.ingredients
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = String(Math.random());
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;

      if (
        fromIndex < 0 ||
        fromIndex >= state.ingredients.length ||
        toIndex < 0 ||
        toIndex >= state.ingredients.length ||
        fromIndex === toIndex
      ) {
        return;
      }

      const newIngredients = [...state.ingredients];

      [newIngredients[fromIndex], newIngredients[toIndex]] = [
        newIngredients[toIndex],
        newIngredients[fromIndex]
      ];

      state.ingredients = newIngredients;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = BurgerConstructorSlice.actions;
export const { getBurgerIngredients, getBun, getConstructorItems } =
  BurgerConstructorSlice.selectors;
