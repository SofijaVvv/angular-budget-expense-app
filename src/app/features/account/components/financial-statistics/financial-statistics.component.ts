import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../transactions/models/transaction.model';
import { TransactionService } from '../../../transactions/services/transaction.service';
import { CurrencyPipe, NgClass, NgForOf } from '@angular/common';
import { fixDate } from '../../../../utils/date-utils';

@Component({
  selector: 'app-financial-statistics',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, NgClass],
  templateUrl: './financial-statistics.component.html',
})
export class FinancialStatisticsComponent implements OnInit {
  expenses: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}
  ngOnInit() {
    this.loadFinances();
  }

  loadFinances() {
    this.transactionService.getAll().subscribe((transactions) => {
      this.expenses = transactions.map((transaction) => ({
        ...transaction,
        createdAt: fixDate(transaction.createdAt),
      }));
    });
  }
}
