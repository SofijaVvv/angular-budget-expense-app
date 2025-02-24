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
];
