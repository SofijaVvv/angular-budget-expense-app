import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of } from 'rxjs';
import { BudgetService } from '../services/budget.service';
import {
  createBudget,
  createBudgetFailure,
  createBudgetSuccess,
  editBudget,
  editBudgetSuccess,
  loadBudgets,
  loadBudgetsFailure,
  loadBudgetsSuccess,
} from './budget.actions';

@Injectable()
export class BudgetEffects {
  constructor(
    private actions$: Actions,
    private budgetService: BudgetService,
  ) {}

  loadBudgets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBudgets),
      mergeMap(() =>
        this.budgetService.getAll().pipe(
          map((budget) => loadBudgetsSuccess({ budget })),
          catchError((error) => of(loadBudgetsFailure({ error }))),
        ),
      ),
    ),
  );

  editBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editBudget),
      mergeMap((action) =>
        this.budgetService.update(action.budget).pipe(
          map((budget) => editBudgetSuccess({ budget })),
          catchError((error) => of(loadBudgetsFailure({ error }))),
        ),
      ),
    ),
  );

  createBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createBudget),
      mergeMap((action) =>
        this.budgetService.create(action.budget).pipe(
          map((budget) => createBudgetSuccess({ budget })),
          catchError((error) => of(createBudgetFailure({ error }))),
        ),
      ),
    ),
  );
}
