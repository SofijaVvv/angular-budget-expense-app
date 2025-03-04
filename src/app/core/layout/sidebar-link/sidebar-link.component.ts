import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar-link',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './sidebar-link.component.html',
})
export class SidebarLinkComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() route: string = '';
}
