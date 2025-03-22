import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { Transaction } from './models/transaction.model';
import { TransactionInputComponent } from './components/transaction-input/transaction-input.component';
import { AsyncPipe, NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { TransactionFacade } from './services/transaction.facade';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    ButtonComponent,
    TableComponent,
    TransactionInputComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './transaction.component.html',
})
export default class TransactionComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
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

  constructor(private transactionFacade: TransactionFacade) {
    this.transactions$ = this.transactionFacade.transactions$;
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionFacade.loadTransactions();
  }

  toggleTransactionInput(): void {
    this.isTransactionInputVisible = !this.isTransactionInputVisible;
  }

  async deleteTransaction(id: number): Promise<void> {
    Swal.fire({
      icon: 'question',
      title: 'Are you sure you want to delete transaction?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.transactionFacade.deleteTransaction(id);
        Swal.fire('Deleted!', 'Your transaction has been deleted.', 'success');
      }
    });
  }
}
