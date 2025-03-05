import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ButtonComponent, TableComponent],
  templateUrl: './transactions.component.html',
})
export default class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  actions = [
    { label: 'Edit', callback: this.editTransaction.bind(this) },
    {
      label: 'Delete',
      callback: (row: Transaction) => this.deleteTransaction(row.id),
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

  deleteTransaction(id: number): void {
    this.transactionService.delete(id).subscribe({
      next: () => {
        console.log('Deleted transaction with id:', id);
        this.loadTransactions(); // Reload the transactions after deletion
      },
      error: (err) => {
        console.error('Error deleting transaction:', err);
      },
    });
  }
}
