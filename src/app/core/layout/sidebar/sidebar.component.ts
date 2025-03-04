import { Component, OnInit } from '@angular/core';
import {
  AsyncPipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from '@angular/common';
import { UserFacade } from '../../auth/services/user.facade';
import { SidebarLinkComponent } from '../sidebar-link/sidebar-link.component';

@Component({
  selector: 'app-layout-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    AsyncPipe,
    NgIf,
    NgClass,
    SidebarLinkComponent,
    NgForOf,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isSidebarOpen = false;
  links = [{ label: 'Home', icon: './assets/images/home.svg', route: '/home' }];

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
