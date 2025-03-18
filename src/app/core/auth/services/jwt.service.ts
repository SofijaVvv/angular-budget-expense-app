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

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true;
    }
    const payload = this.decodeToken(token);
    const expirationDate = new Date(payload.exp * 1000);
    return expirationDate < new Date();
  }

  private decodeToken(token: string): any {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson);
  }
}
