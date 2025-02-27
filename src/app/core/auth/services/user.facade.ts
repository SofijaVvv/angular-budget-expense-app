import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from '../store/auth.actions';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';
import {
  selectAuthError,
  selectIsAuthenticated,
  selectIsLoading,
  selectUser,
} from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$: Observable<User | null> = this.store.select(selectUser);
  isLoading$: Observable<boolean> = this.store.select(selectIsLoading);
  authError$: Observable<string | null> = this.store.select(selectAuthError);
  isAuthenticated$: Observable<boolean> = this.store.select(
    selectIsAuthenticated,
  );

  constructor(private store: Store) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticated$ = isAuthenticated
      ? of(true)
      : this.store.select(selectIsAuthenticated);
  }

  login(credentials: { email: string; password: string }) {
    this.store.dispatch(login({ credentials }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
