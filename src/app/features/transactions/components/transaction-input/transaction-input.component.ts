import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-transaction-input',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './transaction-input.component.html',
})
export class TransactionInputComponent implements OnInit {
  @Output() cancelTransaction = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  //TODO popravi da custom dugme prima events

  onCancel(): void {
    this.cancelTransaction.emit();
  }
}
