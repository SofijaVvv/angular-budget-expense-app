import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { AuthFacade } from './services/auth.facade';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export default class AuthComponent {
  constructor(private authFacade: AuthFacade) {}

  onLogin() {
    const credentials = { email: 'user', password: 'a' };
    this.authFacade.login(credentials);
  }
}
