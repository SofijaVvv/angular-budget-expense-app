import { createAction, props } from '@ngrx/store';

export const register = createAction(
  '[Auth] Register',
  props<{
    credentials: { email: string; fullName: string; password: string };
  }>(),
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ successMessage: string }>(),
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>(),
);
