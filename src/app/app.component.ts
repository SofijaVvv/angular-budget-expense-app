import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { filter } from 'rxjs';
import { UserFacade } from './core/auth/services/user.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private router: Router,
    private userFacade: UserFacade,
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationStart => event instanceof NavigationStart,
        ),
      )
      .subscribe((event) => {
        if (event.navigationTrigger === 'popstate') {
          this.userFacade.logout();
          localStorage.clear();
        }
      });
  }
}
