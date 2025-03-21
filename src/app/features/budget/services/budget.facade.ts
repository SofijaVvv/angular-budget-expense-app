import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Budget } from '../models /budget.model';
import { selectBudgetLoading, selectBudgets } from '../store/budget.selectors';
import { createBudget, editBudget, loadBudgets } from '../store/budget.actions';

@Injectable({
  providedIn: 'root',
})
export class BudgetFacade {
  budgets$: Observable<Budget[]> = this.store.select(selectBudgets);
  loading$: Observable<boolean> = this.store.select(selectBudgetLoading);

  constructor(private store: Store) {}

  loadBudgets() {
    this.store.dispatch(loadBudgets());
  }

  editBudget(budget: Partial<Budget>) {
    this.store.dispatch(editBudget({ budget }));
  }

  createBudget(budget: Partial<Budget>): void {
    this.store.dispatch(createBudget({ budget }));
  }
}
