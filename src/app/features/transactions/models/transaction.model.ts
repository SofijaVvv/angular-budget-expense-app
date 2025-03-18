import { Account } from '../../account/models/account.model';

export interface Category {
  id: number;
  name: string;
}

export interface Transaction {
  id: number;
  account: Account;
  currency: string;
  budgetId: number;
  amount: number;
  createdAt: string;
}
