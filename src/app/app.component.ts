import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { UserFacade } from './core/auth/services/user.facade';
import { JwtService } from './core/auth/services/jwt.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private jwtService: JwtService,
    private userFacade: UserFacade,
  ) {}

  ngOnInit(): void {
    // if (this.jwtService.isTokenExpired()) {
    //   localStorage.removeItem('auth_token');
    //   void this.router.navigate(['/login']);
    // } else {
    //   void this.router.navigate(['/transactions']);
    // }
  }

  private clearUserData(): void {
    localStorage.clear();
    this.userFacade.logout();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(): void {
    if (location.pathname === '/login') {
      this.clearUserData();
      history.pushState(null, '', location.href);
    }
  }
}
