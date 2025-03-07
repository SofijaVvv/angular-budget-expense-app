import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './services/transaction.service';
import { TransactionInputComponent } from './components/transaction-input/transaction-input.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ButtonComponent, TableComponent, TransactionInputComponent, NgIf],
  templateUrl: './transactions.component.html',
})
export default class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  isTransactionInputVisible = true;

  actions = [
    {
      label: 'Edit',
      callback: this.editTransaction.bind(this),
      color: 'text-blue-500 hover:text-blue-700',
    },
    {
      label: 'Delete',
      callback: (row: Transaction) => this.deleteTransaction(row.id),
      color: 'text-red-500 hover:text-red-700',
    },
  ];
  displayedColumns = ['id', 'amount', 'currency', 'createdAt'];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  private loadTransactions() {
    this.transactionService
      .getAll()
      .subscribe((data) => (this.transactions = data));
  }

  editTransaction(transaction: Transaction): void {
    console.log('Editing transaction:', transaction);
  }

  toggleTransactionInput(): void {
    this.isTransactionInputVisible = !this.isTransactionInputVisible;
  }

  deleteTransaction(id: number): void {
    this.transactionService.delete(id).subscribe({
      next: () => {
        console.log('Deleted transaction with id:', id);
        this.loadTransactions();
      },
    });
  }
}
