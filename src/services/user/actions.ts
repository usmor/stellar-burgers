import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getOrdersApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    { email, password }: Omit<TLoginData, 'name'>,
    { rejectWithValue }
  ) => {
    const data = await loginUserApi({ email, password });
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi(registerData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        return null;
      })
      .catch((error: any) => rejectWithValue(error.message || 'Ошибка выхода'));
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: Partial<TRegisterData>, { rejectWithValue }) => {
    const data = await updateUserApi(userData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    return data.user;
  }
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    const data = await forgotPasswordApi({ email });
    if (!data?.success) {
      return rejectWithValue('Ошибка восстановления пароля');
    }
    return true;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }, { rejectWithValue }) => {
    const response = await resetPasswordApi(data);
    if (!response?.success) {
      return rejectWithValue('Ошибка сброса пароля');
    }
    return true;
  }
);

export const getUserOrders = createAsyncThunk(
  'user/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (error: any) {
      return rejectWithValue('Ошибка получения заказов');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { rejectWithValue }) => {
    try {
      if (getCookie('accessToken')) {
        const response = await getUserApi();
        if (response.success) {
          return response.user;
        }
      }
      return null;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка проверки авторизации');
    }
  }
);
