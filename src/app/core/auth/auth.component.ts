import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass',
})
export default class AuthComponent {}
