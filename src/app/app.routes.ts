import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authRedirectGuard } from './core/guards/auth-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/auth.component'),
    canActivate: [authRedirectGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./core/auth/auth.component'),
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component'),
    canActivate: [authGuard],
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/account.component'),
    canActivate: [authGuard],
  },
  {
    path: 'budget',
    loadComponent: () => import('./features/budget/budget.component'),
    canActivate: [authGuard],
  },
  {
    path: 'transactions',
    loadComponent: () =>
      import('./features/transactions/transaction.component'),
    canActivate: [authGuard],
  },
];
