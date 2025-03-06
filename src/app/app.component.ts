import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { Subscription } from 'rxjs';
import { UserFacade } from './core/auth/services/user.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | null = null;
  constructor(
    private router: Router,
    private userFacade: UserFacade,
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.includes('/login') || event.url.includes('/register')) {
          this.clearUserData();
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private clearUserData() {
    localStorage.clear();
    this.userFacade.logout();
  }
}
