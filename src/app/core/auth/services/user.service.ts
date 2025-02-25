import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { JwtService } from './jwt.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;
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
      }>(`${this.baseUrl}/api/Users/Login`, credentials)
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
      }>(`${this.baseUrl}/api/Users/Register`, credentials)
      .pipe(map((response) => response.message));
  }

  logout() {
    this.localStorage.destroyToken();
    void this.router.navigate(['/']);
  }
}
