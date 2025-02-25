import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { register, registerFailure, registerSuccess } from './register.actions';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      mergeMap((action) =>
        this.userService.register(action.credentials).pipe(
          map((successMessage) => registerSuccess({ successMessage })),
          catchError((error) => {
            const errorMessage =
              error?.error?.message || 'An unexpected error occurred';
            return of(registerFailure({ error: errorMessage }));
          }),
        ),
      ),
    );
  });
}
