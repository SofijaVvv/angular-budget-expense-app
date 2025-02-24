import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout } from './auth.actions';

export const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(
    login,
    (state): AuthState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    loginSuccess,
    (state): AuthState => ({
      ...state,
      isAuthenticated: true,
      loading: false,
      error: null,
    }),
  ),
  on(
    loginFailure,
    (state, { error }): AuthState => ({
      ...state,
      isAuthenticated: false,
      loading: false,
      error,
    }),
  ),
  on(logout, (): AuthState => initialState),
);
