import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Budget } from '../models /budget.model';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Budget[]> {
    return this.http.get<Budget[]>('api/Budgets');
  }

  create(budget: Partial<Budget>): Observable<Budget> {
    return this.http.post<Budget>('api/Budgets', budget);
  }

  update(budget: Partial<Budget>): Observable<Budget> {
    return this.http
      .put<Budget>(`api/Budgets/${budget.id}`, budget)
      .pipe(
        tap((updatedBudget) =>
          console.log('HTTP response for update:', updatedBudget),
        ),
      );
  }
}
