import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: { email: string; password: string } }>(),
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');

export const deleteUser = createAction(
  '[Auth] Delete User',
  props<{ id: number }>(),
);
export const deleteUserSuccess = createAction('[Auth] Delete User Success');
export const deleteUserFailure = createAction(
  '[Auth] Delete User Failure',
  props<{ error: string }>(),
);
