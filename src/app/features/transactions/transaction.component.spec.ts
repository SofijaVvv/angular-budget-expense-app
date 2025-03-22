import { ComponentFixture, TestBed } from '@angular/core/testing';
import TransactionComponent from './transaction.component';
import { TransactionFacade } from './services/transaction.facade';
import Swal from 'sweetalert2';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let transactionFacade: jasmine.SpyObj<TransactionFacade>;

  beforeEach(() => {
    const transactionFacadeSpy = jasmine.createSpyObj('TransactionFacade', [
      'loadTransactions',
      'deleteTransaction',
    ]);

    TestBed.configureTestingModule({
      imports: [TransactionComponent],
      providers: [
        { provide: TransactionFacade, useValue: transactionFacadeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    transactionFacade = TestBed.inject(
      TransactionFacade,
    ) as jasmine.SpyObj<TransactionFacade>;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadTransactions on ngOnInit', () => {
    component.ngOnInit();
    expect(transactionFacade.loadTransactions).toHaveBeenCalled();
  });

  it('should call deleteTransaction and show confirmation dialog when deleteTransaction is called', async () => {
    const mockTransactionId = 1;
    const swalSpy = spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: true } as any),
    );

    await component.deleteTransaction(mockTransactionId);

    expect(swalSpy).toHaveBeenCalled();
    expect(transactionFacade.deleteTransaction).toHaveBeenCalledWith(
      mockTransactionId,
    );
    expect(swalSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({
        icon: 'question',
        title: 'Are you sure you want to delete transaction?',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }),
    );
  });

  it('should not call deleteTransaction if the user cancels the confirmation', async () => {
    const mockTransactionId = 1;
    const swalSpy = spyOn(Swal, 'fire').and.returnValue(
      Promise.resolve({ isConfirmed: false } as any),
    );

    await component.deleteTransaction(mockTransactionId);

    expect(swalSpy).toHaveBeenCalled();
    expect(transactionFacade.deleteTransaction).not.toHaveBeenCalled();
  });
});
