import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgClass } from '@angular/common';

type ButtonColor = 'indigo' | 'gray' | 'red';
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
  @Input() color: ButtonColor = 'indigo';
  @Input() size: ButtonSize = 'medium';
  @Input() fullWidth: boolean = false;
  @Input() borderRadius: ButtonBorderRadius = 'md';
  @Input() disabled: boolean = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  colorClasses: Record<ButtonColor, string> = {
    indigo: 'bg-indigo-600 text-white hover:bg-indigo-700',
    gray: 'bg-gray-500 text-white hover:bg-gray-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
  };

  disabledColorClasses: Record<ButtonColor, string> = {
    indigo: 'bg-indigo-400 text-white cursor-not-allowed',
    gray: 'bg-gray-400 text-white cursor-not-allowed',
    red: 'bg-red-400 text-white cursor-not-allowed',
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

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
