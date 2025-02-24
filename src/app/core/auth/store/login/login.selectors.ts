import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from './login.state';

export const selectLoginState = createFeatureSelector<LoginState>('auth');

export const selectUser = createSelector(
  selectLoginState,
  (state: LoginState) => state.user,
);

export const selectIsAuthenticated = createSelector(
  selectLoginState,
  (state: LoginState) => state.isAuthenticated,
);

export const selectIsLoading = createSelector(
  selectLoginState,
  (state: LoginState) => state.loading,
);

export const selectAuthError = createSelector(
  selectLoginState,
  (state: LoginState) => state.error,
);
