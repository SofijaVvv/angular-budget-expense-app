import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/components/spinner/spinner-component';
import { UserFacade } from './core/auth/services/user.facade';
import { JwtService } from './core/auth/services/jwt.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private jwtService: JwtService,
    private userFacade: UserFacade,
  ) {}

  ngOnInit(): void {
    if (this.jwtService.isTokenExpired()) {
      this.jwtService.destroyToken();
      this.userFacade.logout();
    }
  }
}
