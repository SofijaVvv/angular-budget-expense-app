import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthFacade } from './services/auth.facade';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated } from './store/auth.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export default class AuthComponent implements OnInit {
  private authSubscription: Subscription | undefined;
  constructor(
    private authFacade: AuthFacade,
    private store: Store,
  ) {}

  ngOnInit() {
    this.authSubscription = this.store
      .select(selectIsAuthenticated)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          console.log('Login successful');
        } else {
          console.log('Fail');
        }
      });
  }

  onLogin() {
    const credentials = { email: 'user', password: 'a' };
    this.authFacade.login(credentials);
  }
}
