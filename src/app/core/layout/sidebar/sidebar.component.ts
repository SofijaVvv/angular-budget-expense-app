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
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
    ButtonComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  isAuthenticated: boolean = false;
  isSidebarOpen = false;
  links = [
    { label: 'Home', icon: './assets/images/home.svg', route: '/home' },
    {
      label: 'Transactions',
      icon: './assets/images/transactions.svg',
      route: '/transactions',
    },
    {
      label: 'Budget',
      icon: './assets/images/budget.svg',
      route: '/budget',
    },
    {
      label: 'Account',
      icon: './assets/images/account.svg',
      route: '/account',
    },
  ];

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.userFacade.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLogOut() {
    this.userFacade.logout();
  }
}
