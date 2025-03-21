import { createReducer, on } from '@ngrx/store';

import { fixDate } from '../../../utils/date-utils';
import { BudgetState } from './budget.state';
import {
  createBudget,
  createBudgetFailure,
  createBudgetSuccess,
  editBudget,
  editBudgetFailure,
  editBudgetSuccess,
  loadBudgets,
  loadBudgetsFailure,
  loadBudgetsSuccess,
} from './budget.actions';

export const initialState: BudgetState = {
  budget: [],
  loading: false,
  error: null,
};

export const budgetReducer = createReducer(
  initialState,
  on(loadBudgets, (state) => ({ ...state, loading: true })),
  on(loadBudgetsSuccess, (state, { budget }) => ({
    ...state,
    budget: budget.map((b) => ({
      ...b,
      createdAt: fixDate(b.createdAt),
    })),
    loading: false,
  })),
  on(loadBudgetsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(editBudget, (state, { budget }) => ({
    ...state,
    loading: true,
  })),
  on(editBudgetSuccess, (state, { budget }) => ({
    ...state,
    budget: state.budget.map((b) => (b.id === budget.id ? budget : b)),
  })),
  on(editBudgetFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(createBudget, (state) => ({ ...state, loading: true })),
  on(createBudgetSuccess, (state, { budget }) => ({
    ...state,
    budget: [
      ...state.budget,
      { ...budget, createdAt: fixDate(budget.createdAt) },
    ],
  })),
  on(createBudgetFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
