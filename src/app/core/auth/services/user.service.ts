import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log('Login Credentials:', credentials);
    return this.http
      .post<{
        token: string;
        user: User;
      }>(`${this.baseUrl}/api/Users/Login`, credentials, { headers })
      .pipe(
        map((response) => {
          const token = response.token;
          this.localStorage.saveToken(token);
          console.log(response.user);
          return response.user;
        }),
      );
  }

  logout() {
    this.localStorage.destroyToken();
    void this.router.navigate(['/']);
  }
}
