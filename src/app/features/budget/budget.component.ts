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
    {
      label: 'Delete',
      callback: (row: Budget) => this.deleteBudget(row.id),
      color: 'text-red-500 hover:text-red-700',
    },
  ];
  constructor(private budgetService: BudgetService) {}

  toggleBudgetInput(): void {
    this.isBudgetInputVisible = !this.isBudgetInputVisible;
  }

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.budgetService.getAll().subscribe((data) => (this.budgets = data));
  }

  deleteBudget(id: number): void {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete budget?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.budgetService.delete(id).subscribe(() => {
          void Swal.fire(
            'Deleted!',
            'Your budget has been deleted.',
            'success',
          );
          this.budgets = this.budgets.filter((budget) => budget.id !== id);
        });
      }
    });
  }

  editBudget(budget: Budget) {
    this.selectedBudget = budget;
    this.isBudgetInputVisible = true;
    console.log('budget selected:', this.selectedBudget);
  }
}
