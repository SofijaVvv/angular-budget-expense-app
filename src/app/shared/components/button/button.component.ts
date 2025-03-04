import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

type ButtonColor = 'blue' | 'gray' | 'red';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonBorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: `./button.component.html`,
})
export class ButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() color: ButtonColor = 'blue';
  @Output() buttonClick = new EventEmitter<void>();
  @Input() size: ButtonSize = 'medium';
  @Input() fullWidth: boolean = false;
  @Input() borderRadius: ButtonBorderRadius = 'md';

  colorClasses: Record<ButtonColor, string> = {
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    gray: 'bg-gray-500 text-white hover:bg-gray-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
  };

  sizeClasses: Record<ButtonSize, string> = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  borderRadiusClasses: Record<ButtonBorderRadius, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
  };

  handleClick(): void {
    this.buttonClick.emit();
  }
}
