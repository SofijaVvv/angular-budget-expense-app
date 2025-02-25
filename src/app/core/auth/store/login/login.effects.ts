import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { login, loginFailure, loginSuccess } from './login.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { registerFailure } from '../register/register.actions';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap((action) => {
        return this.userService.login(action.credentials).pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) => {
            const errorMessage =
              error?.error?.message || 'An unexpected error occurred';
            return of(loginFailure({ error: errorMessage }));
          }),
        );
      }),
    );
  });
}
