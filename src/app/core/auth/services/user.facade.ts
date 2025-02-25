import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from '../store/login/login.actions';
import { register } from '../store/register/register.actions';

@Injectable({
  providedIn: 'root',
})
export class UserFacade {
  constructor(private store: Store) {}

  login(credentials: { email: string; password: string }) {
    this.store.dispatch(login({ credentials }));
  }

  register(credentials: { email: string; fullName: string; password: string }) {
    this.store.dispatch(register({ credentials }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
