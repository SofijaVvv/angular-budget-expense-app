import { createAction, props } from '@ngrx/store';
import { Budget } from '../models /budget.model';

export const loadBudgets = createAction('[Budgets] Load Budgets');

export const loadBudgetsSuccess = createAction(
  '[Budgets] Load Budgets Success',
  props<{ budget: Budget[] }>(),
);

export const loadBudgetsFailure = createAction(
  '[Budgets] Load Budgets Failure',
  props<{ error: any }>(),
);

export const editBudget = createAction(
  '[Budgets] Edit Budget',
  props<{ budget: Partial<Budget> }>(),
);

export const editBudgetSuccess = createAction(
  '[Budgets] Edit Budget Success',
  props<{ budget: Budget }>(),
);

export const editBudgetFailure = createAction(
  '[Budgets] Edit Budget Failure',
  props<{ error: any }>(),
);

export const createBudget = createAction(
  '[Budgets] Create Budget',
  props<{ budget: Partial<Budget> }>(),
);

export const createBudgetSuccess = createAction(
  '[Budgets] Create Budget Success',
  props<{ budget: Budget }>(),
);

export const createBudgetFailure = createAction(
  '[Budgets] Create Budget Failure',
  props<{ error: any }>(),
);
