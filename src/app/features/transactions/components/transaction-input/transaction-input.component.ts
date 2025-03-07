import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-transaction-input',
  standalone: true,
  imports: [ButtonComponent, DropdownComponent, InputComponent],
  templateUrl: './transaction-input.component.html',
})
export class TransactionInputComponent implements OnInit {
  @Output() cancelTransaction = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  //TODO popravi da custom dugme prima events

  onCancel(event: Event): void {
    event.preventDefault();
    this.cancelTransaction.emit();
  }

  handleSelection(selected: string) {
    console.log('Selected option:', selected);
  }
}
