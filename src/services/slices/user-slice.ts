import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserState } from '@utils-types';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

const saveTokens = (
  accessToken?: string | null,
  refreshToken?: string | null
) => {
  if (accessToken) {
    const token = accessToken.startsWith('Bearer ')
      ? accessToken.split(' ')[1]
      : accessToken;
    setCookie('accessToken', token);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

const clearTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

export const register = createAsyncThunk(
  'user/register',
  async (
    data: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await registerUserApi(data);
      saveTokens(res.accessToken, res.refreshToken);
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Ошибка регистрации');
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      saveTokens(res.accessToken, res.refreshToken);
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Ошибка входа');
    }
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await logoutApi();
      }
      clearTokens();
      return true;
    } catch (e: any) {
      clearTokens();
      return rejectWithValue(e?.message || 'Ошибка при выходе');
    }
  }
);

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (e: any) {
      return rejectWithValue(
        e?.message || 'Не удалось получить данные пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    data: { name?: string; email?: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateUserApi(data);
      return res.user;
    } catch (e: any) {
      return rejectWithValue(e?.message || 'Не удалось обновить профиль');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
    setAuthChecked(state) {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  selectors: {
    userDataSelector: (state) => state.user,
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isUserLoadingSelector: (state) => state.loading,
    userErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    // register
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Ошибка регистрации';
      });

    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Ошибка при выходе';
      });

    // logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Ошибка при выходе';
      });

    // get user
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthChecked = true;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Не удалось получить данные пользователя';

        clearTokens();
      });

    // update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          action.error.message ||
          'Не удалось обновить профиль';
      });
  }
});

export const { reducer: userReducer, actions: userActions } = userSlice;
export const { resetError, setAuthChecked, userLogout } = userSlice.actions;

export const {
  userDataSelector,
  isAuthCheckedSelector,
  isUserLoadingSelector,
  userErrorSelector
} = userSlice.selectors;

export default userReducer;
