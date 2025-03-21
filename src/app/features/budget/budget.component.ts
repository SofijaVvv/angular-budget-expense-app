import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';
import { TransactionInputComponent } from '../transactions/components/transaction-input/transaction-input.component';
import { BudgetService } from './services/budget.service';
import { Budget } from './models /budget.model';
import { BudgetInputComponent } from './components/budget-input/budget-input.component';
import { BudgetFacade } from './services/budget.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    TableComponent,
    TransactionInputComponent,
    BudgetInputComponent,
    AsyncPipe,
  ],
  templateUrl: './budget.component.html',
})
export default class BudgetComponent implements OnInit {
  budgets$: Observable<Budget[]>;
  isBudgetInputVisible = false;
  selectedBudget: Budget | null = null;
  displayedColumns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Budget Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'category.name', label: 'Category' },
    { key: 'createdAt', label: 'Created At' },
  ];
  actions = [
    {
      label: 'Edit',
      callback: (row: Budget) => this.editBudget(row),
      color: 'text-blue-500 hover:text-blue-700',
    },
  ];
  constructor(private budgetFacade: BudgetFacade) {
    this.budgets$ = this.budgetFacade.budgets$;
  }

  toggleBudgetInput(): void {
    this.isBudgetInputVisible = !this.isBudgetInputVisible;
  }

  onClose() {
    this.isBudgetInputVisible = false;
    this.selectedBudget = null;
  }

  ngOnInit() {
    this.budgetFacade.loadBudgets();
  }

  editBudget(budget: Budget) {
    this.selectedBudget = budget;
    this.isBudgetInputVisible = true;
  }
}
