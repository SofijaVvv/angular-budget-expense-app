import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { deleteUser, login, logout } from '../store/auth.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import {
  selectAuthError,
  selectIsAuthenticated,
  selectUser,
} from '../store/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  user$: Observable<User | null> = this.store.select(selectUser);
  authError$: Observable<string | null> = this.store.select(selectAuthError);
  isAuthenticated$: Observable<boolean> = this.store.select(
    selectIsAuthenticated,
  );

  constructor(private store: Store) {}

  login(credentials: { email: string; password: string }) {
    this.store.dispatch(login({ credentials }));
  }

  logout() {
    this.store.dispatch(logout());
  }

  deleteUser(id: number) {
    this.store.dispatch(deleteUser({ id }));
  }
}
