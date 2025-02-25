import { RegisterState } from './register.state';
import { createReducer, on } from '@ngrx/store';
import { register, registerFailure, registerSuccess } from './register.actions';

export const initialRegisterState: RegisterState = {
  isRegistered: false,
  registerError: null,
  registerSuccessMessage: null,
};

export const registerReducer = createReducer(
  initialRegisterState,
  on(
    register,
    (state): RegisterState => ({
      ...state,
      isRegistered: false,
      registerError: null,
      registerSuccessMessage: null,
    }),
  ),
  on(
    registerSuccess,
    (state, { successMessage }): RegisterState => ({
      ...state,
      isRegistered: true,
      registerSuccessMessage: successMessage,
      registerError: null,
    }),
  ),
  on(
    registerFailure,
    (state, { error }): RegisterState => ({
      ...state,
      isRegistered: false,
      registerError: error,
      registerSuccessMessage: null,
    }),
  ),
);
