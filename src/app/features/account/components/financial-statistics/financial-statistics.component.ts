import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../transactions/models/transaction.model';
import { TransactionService } from '../../../transactions/services/transaction.service';
import { CurrencyPipe, NgClass, NgForOf } from '@angular/common';

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
        createdAt: this.fixDate(transaction.createdAt),
      }));
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
