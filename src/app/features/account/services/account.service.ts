import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<Account> {
    return this.http.get<Account>('api/Accounts/Details').pipe();
  }

  getAccountDetailsFormatted(): Observable<{
    details: Account;
    currencyCode: string;
  }> {
    return this.getAccountDetails().pipe(
      map((data) => ({
        details: data,
        currencyCode: data.currency ?? 'USD',
      })),
    );
  }
}
