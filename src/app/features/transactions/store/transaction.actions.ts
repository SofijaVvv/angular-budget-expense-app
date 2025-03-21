import { createAction, props } from '@ngrx/store';
import { Transaction } from '../models/transaction.model';

export const loadTransactions = createAction(
  '[Transactions] Load Transactions',
);

export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: Transaction[] }>(),
);

export const loadTransactionsFailure = createAction(
  '[Transactions] Load Transactions Failure',
  props<{ error: any }>(),
);

export const deleteTransaction = createAction(
  '[Transactions] Delete Transaction',
  props<{ id: number }>(),
);

export const deleteTransactionSuccess = createAction(
  '[Transactions] Delete Transaction Success',
  props<{ id: number }>(),
);

export const deleteTransactionFailure = createAction(
  '[Transactions] Delete Transaction Failure',
  props<{ error: any }>(),
);

export const createTransaction = createAction(
  '[Transactions] Create Transaction',
  props<{ transaction: Partial<Transaction> }>(),
);

export const createTransactionSuccess = createAction(
  '[Transactions] Create Transaction Success',
  props<{ transaction: Transaction }>(),
);

export const createTransactionFailure = createAction(
  '[Transactions] Create Transaction Failure',
  props<{ error: any }>(),
);
