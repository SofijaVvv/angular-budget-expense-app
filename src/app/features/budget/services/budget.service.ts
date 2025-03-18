import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Budget } from '../models /budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Budget[]> {
    return this.http.get<Budget[]>('api/Budgets');
  }

  getById(id: number): Observable<Budget> {
    return this.http.get<Budget>(`api/Budgets/${id}`);
  }

  create(budget: Partial<Budget>): Observable<Budget> {
    return this.http.post<Budget>('api/Budgets', budget);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`api/Budgets/${id}`);
  }

  update(budget: Partial<Budget>): Observable<Budget> {
    return this.http.put<Budget>(`api/Budgets/${budget.id}`, budget);
  }
}
