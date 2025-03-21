import { Budget } from '../models /budget.model';

export interface BudgetState {
  budget: Budget[];
  loading: boolean;
  error: any;
}
