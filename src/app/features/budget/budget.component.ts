import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NgIf } from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';
import { TransactionInputComponent } from '../transactions/components/transaction-input/transaction-input.component';
import { BudgetService } from './services/budget.service';
import { Budget } from './models /budget.model';
import { Transaction } from '../transactions/models/transaction.model';
import { BudgetInputComponent } from './components/budget-input/budget-input.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    TableComponent,
    TransactionInputComponent,
    BudgetInputComponent,
  ],
  templateUrl: './budget.component.html',
})
export default class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
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
  constructor(private budgetService: BudgetService) {}

  toggleBudgetInput(): void {
    this.isBudgetInputVisible = !this.isBudgetInputVisible;
  }

  onClose() {
    this.isBudgetInputVisible = false;
    this.selectedBudget = null;
  }

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.budgetService.getAll().subscribe((data) => (this.budgets = data));
  }

  editBudget(budget: Budget) {
    this.selectedBudget = budget;
    this.isBudgetInputVisible = true;
    console.log('budget selected:', this.selectedBudget);
  }
}
