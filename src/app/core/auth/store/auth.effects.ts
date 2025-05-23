import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      mergeMap((action) => {
        return this.userService.login(action.credentials).pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) => {
            let errorMessage = 'An unexpected error occurred';
            if (error.status === 400 || error.status === 404) {
              errorMessage = 'Email or password are incorrect';
            }
            return of(loginFailure({ error: errorMessage }));
          }),
        );
      }),
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          void this.router.navigate(['/home']);
        }),
      );
    },
    { dispatch: false },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.userService.logout();
        }),
      );
    },
    { dispatch: false },
  );

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ id }) =>
        this.userService.delete(id).pipe(
          map(() => deleteUserSuccess()),
          tap(() => void this.router.navigate(['/login'])),
          catchError(() =>
            of(deleteUserFailure({ error: 'Failed to delete user' })),
          ),
        ),
      ),
    );
  });
}
