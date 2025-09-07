import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const IngredientsAction = createAsyncThunk(
  'burgerConstructor/ingredients',
  async () => getIngredientsApi()
);
