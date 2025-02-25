import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { register, registerFailure, registerSuccess } from './register.actions';
import { Router } from '@angular/router';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
  ) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      mergeMap((action) =>
        this.userService.register(action.credentials).pipe(
          map((successMessage) => registerSuccess({ successMessage })),
          tap(() => this.router.navigate(['/login'])),
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
