import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { UserFacade } from './services/user.facade';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export default class AuthComponent {
  constructor(private authFacade: UserFacade) {}

  onLogin() {
    const credentials = { email: 'user', password: 'aa' };
    this.authFacade.login(credentials);
  }

  onRegister() {
    const credentials = {
      email: 'user',
      fullName: 'sadasdasdgdfhdrt6ny6rt',
      password: 'rrrrrr',
    };
    this.authFacade.register(credentials);
  }
}
