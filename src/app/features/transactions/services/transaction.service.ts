import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('api/Transactions');
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`api/Transactions/${id}`);
  }

  create(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.post<Transaction>('api/Transactions', transaction);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`api/Transactions/${id}`);
  }

  update(transaction: Partial<Transaction>): Observable<Transaction> {
    return this.http.put<Transaction>(
      `api/Transactions/${transaction.id}`,
      transaction,
    );
  }
}
