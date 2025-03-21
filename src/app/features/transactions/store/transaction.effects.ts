import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TransactionService } from '../services/transaction.service';
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
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class TransactionEffects {
  constructor(
    private actions$: Actions,
    private transactionService: TransactionService,
  ) {}

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTransactions),
      mergeMap(() =>
        this.transactionService.getAll().pipe(
          map((transactions) => loadTransactionsSuccess({ transactions })),
          catchError((error) => of(loadTransactionsFailure({ error }))),
        ),
      ),
    ),
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTransaction),
      mergeMap((action) =>
        this.transactionService.delete(action.id).pipe(
          map(() => deleteTransactionSuccess({ id: action.id })),
          catchError((error) => of(deleteTransactionFailure({ error }))),
        ),
      ),
    ),
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTransaction),
      mergeMap((action) =>
        this.transactionService.create(action.transaction).pipe(
          map((transaction) => createTransactionSuccess({ transaction })),
          catchError((error) => of(createTransactionFailure({ error }))),
        ),
      ),
    ),
  );
}
