import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from '../store/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store) {}

  login(credentials: { email: string; password: string }) {
    this.store.dispatch(login({ credentials }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
