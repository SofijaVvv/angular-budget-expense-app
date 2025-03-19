import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { Observable } from 'rxjs';
import { DropdownStore } from './dropdown.store';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgIf, NgForOf, ClickOutsideDirective],
  templateUrl: './dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() options: any[] = [];
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() displayProperty: string = 'name';
  @Input() valueProperty: string = 'id';
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

  writeValue(value: any): void {
    if (
      this.options &&
      this.options.length > 0 &&
      typeof this.options[0] === 'object'
    ) {
      const selected = this.options.find(
        (opt) => opt[this.valueProperty] === value,
      );
      this.selectedOption = selected ? selected[this.displayProperty] : null;
    } else {
      this.selectedOption = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectOption(option: any) {
    let displayValue: string;
    let value: any;

    if (typeof option === 'object' && option !== null) {
      displayValue = option[this.displayProperty];
      value = option[this.valueProperty];
    } else {
      displayValue = option;
      value = option;
    }

    this.selectedOption = displayValue;
    this.selectionChange.emit(value);
    this.onChange(value);
    this.dropdownStore.closeDropdown();
  }

  onBlur() {
    this.onTouched();
  }

  closeDropdown() {
    this.dropdownStore.closeDropdown();
  }

  isObject(option: any): boolean {
    return option !== null && typeof option === 'object';
  }
}
