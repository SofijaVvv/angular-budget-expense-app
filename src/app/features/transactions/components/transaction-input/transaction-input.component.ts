import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../models/transaction.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-transaction-input',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './transaction-input.component.html',
})
export class TransactionInputComponent implements OnInit {
  transactionForm: FormGroup = this.fb.group({});
  @Output() submitTransaction = new EventEmitter<Transaction>();
  @Output() cancelTransaction = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onCancel(): void {
    this.cancelTransaction.emit();
  }
}
