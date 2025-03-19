import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Account } from '../account/models/account.model';
import { AccountService } from '../account/services/account.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, CurrencyPipe, RouterLink],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit {
  accountDetails: Account | null = null;
  currencyCode: string = 'USD';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.loadAccountDetails();
  }

  loadAccountDetails() {
    this.accountService.getAccountDetails().subscribe((data) => {
      this.accountDetails = data;
      this.setCurrencyCode(data.currency);
    });
  }

  setCurrencyCode(currency: string) {
    if (currency === 'EUR') {
      this.currencyCode = 'EUR';
    } else if (currency === 'USD') {
      this.currencyCode = 'USD';
    }
  }
}
