import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import {
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './auth.actions';

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
    (state, { user }): AuthState => ({
      ...state,
      user,
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
  on(
    deleteUser,
    (state): AuthState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    deleteUserSuccess,
    (state): AuthState => ({
      ...state,
      user: null,
      isAuthenticated: false,
      loading: false,
    }),
  ),
  on(
    deleteUserFailure,
    (state, { error }): AuthState => ({
      ...state,
      loading: false,
      error,
    }),
  ),
);
