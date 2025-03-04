import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import { UserFacade } from '../../auth/services/user.facade';

@Component({
  selector: 'app-layout-navbar',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe, NgIf, NgClass],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;
  @Input() isSidebarOpen = false;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.userFacade.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
