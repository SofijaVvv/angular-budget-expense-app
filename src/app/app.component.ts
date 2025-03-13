import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationStart } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { UserFacade } from './core/auth/services/user.facade';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubscription!: Subscription;
  constructor(
    private router: Router,
    private userFacade: UserFacade,
  ) {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: any) => {
        if (event.url === '/login') {
          this.clearUserData();
          history.pushState(null, '', location.href);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent): void {
    if (location.pathname === '/login') {
      this.clearUserData();
      history.pushState(null, '', location.href);
    }
  }

  private clearUserData(): void {
    localStorage.clear();
    this.userFacade.logout();
  }
}
