import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './services/transaction.service';
import { TransactionInputComponent } from './components/transaction-input/transaction-input.component';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ButtonComponent, TableComponent, TransactionInputComponent, NgIf],
  templateUrl: './transactions.component.html',
})
export default class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  isTransactionInputVisible = false;
  displayedColumns = [
    { key: 'id', label: 'ID' },
    { key: 'amount', label: 'Amount' },
    { key: 'currency', label: 'Currency' },
    { key: 'createdAt', label: 'Created At' },
  ];

  actions = [
    {
      label: 'Delete',
      callback: (row: Transaction) => this.deleteTransaction(row.id),
      color: 'text-red-500 hover:text-red-700',
    },
  ];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAll().subscribe(
      (data) =>
        (this.transactions = data.map((transaction) => ({
          ...transaction,
          createdAt: this.fixDate(transaction.createdAt),
        }))),
    );
  }

  toggleTransactionInput(): void {
    this.isTransactionInputVisible = !this.isTransactionInputVisible;
  }

  deleteTransaction(id: number): void {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete transaction?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.transactionService.delete(id).subscribe(() => {
          void Swal.fire(
            'Deleted!',
            'Your transaction has been deleted.',
            'success',
          );
          this.loadTransactions();
        });
      }
    });
  }

  private fixDate(dateString: string): string {
    if (!dateString || dateString.startsWith('0001-01-01')) {
      return 'N/A';
    }
    const date = new Date(dateString);
    date.setHours(date.getHours() + 1);
    return date.toLocaleString('de-DE');
  }
}
