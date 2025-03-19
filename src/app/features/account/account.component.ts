import { Component } from '@angular/core';
import { BudgetInputComponent } from '../budget/components/budget-input/budget-input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { NgIf } from '@angular/common';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [BudgetInputComponent, ButtonComponent, NgIf, TableComponent],
  templateUrl: './account.component.html',
})
export default class AccountComponent {}
