import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgIf, NgForOf],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<string>();

  isOpen = false;
  selectedOption: string | null = null;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.isOpen = false;
  }
}
