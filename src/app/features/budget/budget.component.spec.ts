import { ComponentFixture, TestBed } from '@angular/core/testing';
import BudgetComponent from './budget.component';
import { BudgetFacade } from './services/budget.facade';
import { Budget } from './models /budget.model';

describe('BudgetComponent', () => {
  let component: BudgetComponent;
  let fixture: ComponentFixture<BudgetComponent>;
  let budgetFacade: jasmine.SpyObj<BudgetFacade>;

  beforeEach(() => {
    const budgetFacadeSpy = jasmine.createSpyObj('BudgetFacade', [
      'loadBudgets',
    ]);

    TestBed.configureTestingModule({
      imports: [BudgetComponent],
      providers: [{ provide: BudgetFacade, useValue: budgetFacadeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetComponent);
    component = fixture.componentInstance;
    budgetFacade = TestBed.inject(BudgetFacade) as jasmine.SpyObj<BudgetFacade>;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadBudgets on ngOnInit', () => {
    component.ngOnInit();
    expect(budgetFacade.loadBudgets).toHaveBeenCalled();
  });

  it('should toggle isBudgetInputVisible when toggleBudgetInput is called', () => {
    expect(component.isBudgetInputVisible).toBeFalse();
    component.toggleBudgetInput();
    expect(component.isBudgetInputVisible).toBeTrue();
    component.toggleBudgetInput();
    expect(component.isBudgetInputVisible).toBeFalse();
  });

  it('should set isBudgetInputVisible to false and selectedBudget to null when onClose is called', () => {
    component.selectedBudget = {
      id: 1,
      name: 'Budget 1',
      amount: 1000,
      category: { id: 2, name: 'Food' },
      createdAt: new Date().toDateString(),
    };
    component.isBudgetInputVisible = true;

    component.onClose();

    expect(component.isBudgetInputVisible).toBeFalse();
    expect(component.selectedBudget).toBeNull();
  });

  it('should set selectedBudget and show budget input when editBudget is called', () => {
    const mockBudget: Budget = {
      id: 1,
      name: 'Budget 1',
      amount: 1000,
      category: { id: 2, name: 'Food' },
      createdAt: new Date().toDateString(),
    };

    component.editBudget(mockBudget);

    expect(component.selectedBudget).toEqual(mockBudget);
    expect(component.isBudgetInputVisible).toBeTrue();
  });
});
