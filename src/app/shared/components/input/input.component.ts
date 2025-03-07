import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgClass],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() width: string = 'w-full';
}
