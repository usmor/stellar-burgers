import { expect, test, describe } from '@jest/globals';
import {
  userSlice,
  initialState as initialUserState
} from '../services/user/slice';
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  getUserOrders,
  checkUserAuth
} from '../services/user/actions';
import mockUser from '../utils/mocks/mockUser.json';
import mockOrders from '../utils/mocks/mockOrders.json';

describe('тест userSlice', () => {
  describe('логин пользователя', () => {
    test('запрос в процессе выполнения', () => {
      const action = { type: loginUser.pending.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state).toEqual({
        ...initialUserState,
        isLoading: true
      });
    });

    test('успешные запрос логина', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state).toEqual({
        ...initialUserState,
        user: mockUser
      });
    });

    test('ошибка логина', () => {
      const errorMessage = 'Ошибка входа';
      const action = {
        type: loginUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state).toEqual({
        ...initialUserState,
        error: errorMessage
      });
    });
  });

  describe('регистрация пользователя', () => {
    test('запрос регистрации в процессе выполнения', () => {
      const action = { type: registerUser.pending.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('успешный запрос на регистрацию', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('ошибка запроса регистрации', () => {
      const errorMessage = 'Ошибка регистрации';
      const action = {
        type: registerUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
    });
  });

  describe('выход пользователя', () => {
    const stateWithUser = {
      ...initialUserState,
      user: mockUser,
      userOrders: mockOrders
    };

    test('запрос выхода в процессе выполнения', () => {
      const action = { type: logoutUser.pending.type };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.user).toEqual(mockUser);
    });

    test('успешный запрос на выход', () => {
      const action = { type: logoutUser.fulfilled.type };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state).toEqual(initialUserState);
    });

    test('ошибка запроса выхода', () => {
      const errorMessage = 'Ошибка выхода';
      const action = {
        type: logoutUser.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toEqual(mockUser);
    });
  });

  describe('обновление профиля', () => {
    const stateWithUser = {
      ...initialUserState,
      user: { name: 'Old Name', email: 'old@example.com' }
    };

    test('запрос обновления профиля в процессе выполнения', () => {
      const action = { type: updateUserProfile.pending.type };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('успешный запрос обновления профиля', () => {
      const action = {
        type: updateUserProfile.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('ошибка запроса обновления профиля', () => {
      const errorMessage = 'Ошибка обновления профиля';
      const action = {
        type: updateUserProfile.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toEqual(stateWithUser.user);
    });
  });

  describe('проверка авторизации', () => {
    test('запрос проверки авторизации в процессе выполнения', () => {
      const action = { type: checkUserAuth.pending.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(true);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    test('успешный запрос проверки авторизации', () => {
      const action = {
        type: checkUserAuth.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.user).toEqual(mockUser);
      expect(state.error).toBeNull();
    });

    test('ошибка запроса проверки авторизации', () => {
      const errorMessage = 'Ошибка проверки авторизации';
      const action = {
        type: checkUserAuth.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBe(errorMessage);
      expect(state.user).toBeNull();
    });
  });

  describe('получение заказов пользователя', () => {
    test('заспрос получения заказов в процессе выполнения', () => {
      const action = { type: getUserOrders.pending.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('успешный запрос получения заказов', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.userOrders).toEqual(mockOrders);
      expect(state.error).toBeNull();
    });

    test('ошибка запроса получения заказов', () => {
      const errorMessage = 'Ошибка получения заказов';
      const action = {
        type: getUserOrders.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.userOrders).toEqual([]);
    });
  });

  describe('восстановление пароля', () => {
    test('запрос на восстановления пароля в процессе выполнения', () => {
      const action = { type: forgotPassword.pending.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.error).toBeNull();
    });

    test('успешный запрос восстановления пароля', () => {
      const action = { type: forgotPassword.fulfilled.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.error).toBeNull();
    });

    test('ошибка запроса восстановления пароля', () => {
      const errorMessage = 'Ошибка восстановления пароля';
      const action = {
        type: forgotPassword.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.error).toBe(errorMessage);
    });
  });

  describe('сброс пароля', () => {
    test('запрос сброса пароля в процессе выполнения', () => {
      const action = { type: resetPassword.pending.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.error).toBeNull();
    });

    test('успешный запрос сброса пароля', () => {
      const action = { type: resetPassword.fulfilled.type };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.error).toBeNull();
    });

    test('ошибка сброса пароля', () => {
      const errorMessage = 'Ошибка сброса пароля';
      const action = {
        type: resetPassword.rejected.type,
        error: { message: errorMessage }
      };
      const state = userSlice.reducer(initialUserState, action);

      expect(state.error).toBe(errorMessage);
    });
  });

  describe('тесты синхронных экшенов', () => {
    test('setUser', () => {
      const action = userSlice.actions.setUser(mockUser);
      const state = userSlice.reducer(initialUserState, action);

      expect(state.user).toEqual(mockUser);
    });

    test('setIsAuthChecked', () => {
      const action = userSlice.actions.setIsAuthChecked(true);
      const state = userSlice.reducer(initialUserState, action);

      expect(state.isAuthChecked).toBe(true);
    });

    test('clearError', () => {
      const stateWithError = { ...initialUserState, error: 'Ошибка' };
      const action = userSlice.actions.clearError();
      const state = userSlice.reducer(stateWithError, action);

      expect(state.error).toBeNull();
    });
  });
});
