import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';
import { Budget } from '../../budget/models /budget.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Account[]> {
    return this.http.get<Account[]>('api/Accounts');
  }

  getById(id: number): Observable<Account> {
    return this.http.get<Account>(`api/Accounts/${id}`);
  }

  getAccountDetails(): Observable<Account> {
    return this.http.get<Account>('api/Accounts/Details');
  }
}
