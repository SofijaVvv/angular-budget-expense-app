import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/auth.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/auth.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component'),
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/account.component'),
  },
  {
    path: 'budget',
    loadComponent: () => import('./features/budget/budget.component'),
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./features/transactions/transactions.component'),
  },
];
