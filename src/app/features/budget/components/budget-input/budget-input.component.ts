import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { Category } from '../../models /category.model';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { Budget } from '../../models /budget.model';

@Component({
  selector: 'app-budget-input',
  standalone: true,
  imports: [
    ButtonComponent,
    DropdownComponent,
    InputComponent,
    NgIf,
    ReactiveFormsModule,
  ],
  templateUrl: './budget-input.component.html',
})
export class BudgetInputComponent implements OnInit {
  @Input() budget: Budget | null = null;
  @Output() cancelBudget = new EventEmitter<void>();
  @Output() budgetCreated = new EventEmitter<any>();

  budgetForm: FormGroup = new FormGroup({});
  categoryList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private budgetService: BudgetService,
  ) {}

  ngOnInit() {
    this.loadCatogories();
    this.initForm();
    if (this.budget) {
      this.budgetForm.patchValue(this.budget);
    }
  }

  loadCatogories() {
    this.categoryService.getAll().subscribe((data) => {
      this.categoryList = data;
    });
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const budget = this.budgetForm.value;

      this.budgetService.create(budget).subscribe((data) => {
        Swal.fire({
          icon: 'success',
          title: 'Transaction created successfully',
          timer: 1000,
        }).then(() => {
          this.budgetCreated.emit(data);
          this.cancelBudget.emit();
        });
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

  onCancel(event: Event): void {
    event.preventDefault();
    this.cancelBudget.emit();
  }

  private initForm() {
    this.budgetForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });
  }
}
