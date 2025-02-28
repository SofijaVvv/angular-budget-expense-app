import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const selectLoginState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectLoginState,
  (state: AuthState) => state.user,
);

export const selectIsAuthenticated = createSelector(
  selectLoginState,
  (state: AuthState) => state.isAuthenticated,
);

export const selectIsLoading = createSelector(
  selectLoginState,
  (state: AuthState) => state.loading,
);

export const selectAuthError = createSelector(
  selectLoginState,
  (state: AuthState) => state.error,
);
