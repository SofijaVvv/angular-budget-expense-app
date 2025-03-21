import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BudgetState } from './budget.state';

export const selectBudgetState = createFeatureSelector<BudgetState>('budgets');

export const selectBudgets = createSelector(
  selectBudgetState,
  (state: BudgetState) => state.budget,
);

export const selectBudgetLoading = createSelector(
  selectBudgetState,
  (state: BudgetState) => state.loading,
);
