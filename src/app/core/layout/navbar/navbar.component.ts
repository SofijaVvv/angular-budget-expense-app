import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, NgOptimizedImage } from '@angular/common';
import { UserFacade } from '../../auth/services/user.facade';

@Component({
  selector: 'app-layout-navbar',
  standalone: true,
  imports: [NgOptimizedImage, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.userFacade.isAuthenticated$.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });
  }
}
