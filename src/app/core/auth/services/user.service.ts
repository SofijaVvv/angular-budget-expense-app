import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private localStorage: JwtService,
    private router: Router,
  ) {}

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http
      .post<{
        token: string;
        user: User;
      }>('api/Users/Login', credentials)
      .pipe(
        tap((response) => {
          this.localStorage.saveToken(response.token);
        }),
        map((response) => response.user),
      );
  }

  register(credentials: {
    email: string;
    fullName: string;
    password: string;
  }): Observable<string> {
    return this.http
      .post<{
        message: string;
      }>('api/Users/Register', credentials)
      .pipe(
        tap((response) => {
          console.log('Registration message:', response.message);
        }),
        map((response) => response.message),
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`api/Users/${id}`);
  }

  logout() {
    this.localStorage.destroyToken();
    void this.router.navigate(['/login']);
  }
}
