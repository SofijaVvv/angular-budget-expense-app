import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private tokenKey = 'auth_token';

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    console.log('Token saved to localStorage:', token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  destroyToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
