import { TransactionState } from './transaction.state';
import { createReducer, on } from '@ngrx/store';
import {
  createTransaction,
  createTransactionFailure,
  createTransactionSuccess,
  deleteTransaction,
  deleteTransactionFailure,
  deleteTransactionSuccess,
  loadTransactions,
  loadTransactionsFailure,
  loadTransactionsSuccess,
} from './transaction.actions';
import { fixDate } from '../../../utils/date-utils';

export const initialState: TransactionState = {
  transactions: [],
  loading: false,
  error: null,
};

export const transactionReducer = createReducer(
  initialState,
  on(loadTransactions, (state) => ({ ...state, loading: true })),
  on(loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions: transactions.map((tx) => ({
      ...tx,
      createdAt: fixDate(tx.createdAt),
    })),
    loading: false,
  })),
  on(loadTransactionsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(deleteTransaction, (state) => ({ ...state, loading: true })),
  on(deleteTransactionSuccess, (state, { id }) => ({
    ...state,
    transactions: state.transactions.filter((tx) => tx.id !== id),
  })),
  on(deleteTransactionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(createTransaction, (state) => ({ ...state, loading: true })),
  on(createTransactionSuccess, (state, { transaction }) => ({
    ...state,
    transactions: [
      ...state.transactions,
      { ...transaction, createdAt: fixDate(transaction.createdAt) },
    ],
  })),
  on(createTransactionFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);
