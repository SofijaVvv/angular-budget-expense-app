import { LoginState } from './login.state';
import { createReducer, on } from '@ngrx/store';
import { login, loginFailure, loginSuccess, logout } from './login.actions';

export const initialState: LoginState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginReducer = createReducer(
  initialState,
  on(
    login,
    (state): LoginState => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),
  on(
    loginSuccess,
    (state, { user }): LoginState => ({
      ...state,
      user,
      isAuthenticated: true,
      loading: false,
      error: null,
    }),
  ),
  on(
    loginFailure,
    (state, { error }): LoginState => ({
      ...state,
      isAuthenticated: false,
      loading: false,
      error,
    }),
  ),
  on(logout, (): LoginState => initialState),
);
