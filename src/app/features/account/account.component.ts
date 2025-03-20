import { Component, OnInit } from '@angular/core';
import { BudgetInputComponent } from '../budget/components/budget-input/budget-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CurrencyPipe, NgIf } from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { Account } from './models/account.model';
import { AccountService } from './services/account.service';
import { FinancialStatisticsComponent } from './components/financial-statistics/financial-statistics.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    BudgetInputComponent,
    ButtonComponent,
    NgIf,
    TableComponent,
    UserDetailsComponent,
    CurrencyPipe,
    FinancialStatisticsComponent,
  ],
  templateUrl: './account.component.html',
})
export default class AccountComponent implements OnInit {
  accountDetails: Account | null = null;
  currencyCode: string = 'USD';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.loadAccountDetails();
  }

  loadAccountDetails() {
    this.accountService
      .getAccountDetailsFormatted()
      .subscribe(({ details, currencyCode }) => {
        this.accountDetails = details;
        this.currencyCode = currencyCode;
      });
  }
}
