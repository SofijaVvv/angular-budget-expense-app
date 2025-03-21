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
import { Category } from '../../models /category.model';
import { CategoryService } from '../../services/category.service';
import Swal from 'sweetalert2';
import { Budget } from '../../models /budget.model';
import { BudgetFacade } from '../../services/budget.facade';

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

  budgetForm: FormGroup = new FormGroup({});
  categoryList: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private budgetFacade: BudgetFacade,
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
    if (this.budgetForm.invalid) {
      void Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
        timer: 3000,
      });
      return;
    }

    const budget = this.budgetForm.value;
    const isExistingBudget = !!budget.id;

    if (isExistingBudget) {
      this.budgetFacade.editBudget(budget);
    } else {
      this.budgetFacade.createBudget(budget);
    }

    const successMessage = isExistingBudget
      ? 'Budget updated successfully'
      : 'Budget created successfully';

    Swal.fire({
      icon: 'success',
      title: successMessage,
      timer: 1000,
    }).then(() => {
      this.cancelBudget.emit();
    });
  }

  onCancel(event: Event): void {
    event.preventDefault();
    this.cancelBudget.emit();
  }

  private initForm() {
    this.budgetForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required),
      categoryId: new FormControl(null, Validators.required),
    });
  }
}
