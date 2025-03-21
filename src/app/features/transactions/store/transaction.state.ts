import { Transaction } from '../models/transaction.model';

export interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
  error: any;
}
