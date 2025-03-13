import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ControlValueAccessor } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { Observable } from 'rxjs';
import { DropdownStore } from './dropdown.store';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgIf, NgForOf, ClickOutsideDirective],
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<string>();

  isOpen = false;
  selectedOption: string | null = null;
  uniqueId: string = Math.random().toString(36).substring(2, 15);
  openDropdownId$: Observable<string | null>;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private dropdownStore: DropdownStore) {
    this.openDropdownId$ = this.dropdownStore.openDropdownId$;
    this.openDropdownId$.subscribe((id) => {
      this.isOpen = id === this.uniqueId;
    });
  }

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    if (this.isOpen) {
      this.dropdownStore.closeDropdown();
    } else {
      this.dropdownStore.openDropdown(this.uniqueId);
    }
  }

  writeValue(value: string): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.selectionChange.emit(option);
    this.onChange(option);
    this.dropdownStore.closeDropdown();
  }

  onBlur() {
    this.onTouched();
  }

  closeDropdown() {
    this.dropdownStore.closeDropdown();
  }
}
