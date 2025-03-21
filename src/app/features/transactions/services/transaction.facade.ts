import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { Store } from '@ngrx/store';
import {
  selectTransactionLoading,
  selectTransactions,
} from '../store/transaction.selectors';
import {
  createTransaction,
  deleteTransaction,
  loadTransactions,
} from '../store/transaction.actions';

@Injectable({
  providedIn: 'root',
})
export class TransactionFacade {
  transactions$: Observable<Transaction[]> =
    this.store.select(selectTransactions);
  loading$: Observable<boolean> = this.store.select(selectTransactionLoading);

  constructor(private store: Store) {}

  loadTransactions() {
    this.store.dispatch(loadTransactions());
  }

  deleteTransaction(id: number) {
    this.store.dispatch(deleteTransaction({ id }));
  }

  createTransaction(transaction: Partial<Transaction>): void {
    this.store.dispatch(createTransaction({ transaction }));
  }
}
