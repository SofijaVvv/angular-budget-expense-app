import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { BudgetService } from '../../../budget/services/budget.service';
import { Budget } from '../../../budget/models /budget.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { TransactionFacade } from '../../services/transaction.facade';

@Component({
  selector: 'app-transaction-input',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownComponent,
    InputComponent,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './transaction-input.component.html',
})
export class TransactionInputComponent implements OnInit {
  @Output() cancelTransaction = new EventEmitter<void>();

  transactionTypeList = ['Account', 'Budget'];
  currencyList = ['EUR', 'USD'];
  transactionForm: FormGroup = new FormGroup({});
  budgetList: Budget[] = [];
  selectbudget: {} = {};
  constructor(
    private budgetService: BudgetService,
    private transactionFacade: TransactionFacade,
  ) {}

  ngOnInit(): void {
    this.loadBudgets();
    this.initForm();
  }

  private initForm() {
    this.transactionForm = new FormGroup({
      transactionType: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      budgetId: new FormControl(null),
      amount: new FormControl(0, Validators.required),
    });

    this.transactionForm
      .get('transactionType')
      ?.valueChanges.subscribe((type) => {
        if (type === 'Account') {
          this.transactionForm.get('budgetId')?.setValue(null);
        }
      });
  }

  private loadBudgets() {
    this.budgetService.getAll().subscribe((data) => {
      this.budgetList = data;
      this.selectbudget = this.budgetList;
    });
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.cancelTransaction.emit();
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transaction = this.transactionForm.value;
      this.transactionFacade.createTransaction(transaction);

      Swal.fire({
        icon: 'success',
        title: 'Transaction created successfully',
        timer: 1000,
      }).then(() => {
        this.cancelTransaction.emit();
      });
    } else {
      void Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        timer: 3000,
      });
    }
  }
}
