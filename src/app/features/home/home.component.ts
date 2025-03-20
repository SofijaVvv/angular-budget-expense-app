import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Account } from '../account/models/account.model';
import { AccountService } from '../account/services/account.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService } from '../transactions/services/transaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, CurrencyPipe, RouterLink],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit {
  accountDetails: Account | null = null;
  currencyCode: string = 'USD';
  totalExpenses: number = 0;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
  ) {}

  ngOnInit() {
    this.loadAccountDetails();
    this.canculateTotalExpenses();
  }

  loadAccountDetails() {
    this.accountService
      .getAccountDetailsFormatted()
      .subscribe(({ details, currencyCode }) => {
        this.accountDetails = details;
        this.currencyCode = currencyCode;
      });
  }

  canculateTotalExpenses() {
    this.transactionService.getAll().subscribe((data) => {
      this.totalExpenses = data
        .filter((transacton) => transacton.amount < 0)
        .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);
    });
  }
}
