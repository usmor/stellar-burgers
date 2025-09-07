import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerIngredientsSlice } from './burgerIngredients/slice';
import { feedSlice } from './feedInfo/slice';
import { userSlice } from './user/slice';
import { BurgerConstructorSlice } from './burgerConstructor/slice';
import { orderSlice } from './newOrder/slice';

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  feedSlice,
  userSlice,
  BurgerConstructorSlice,
  orderSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
