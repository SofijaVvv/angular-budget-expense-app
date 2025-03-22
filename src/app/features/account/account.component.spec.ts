import { ComponentFixture, TestBed } from '@angular/core/testing';
import AccountComponent from './account.component';
import { AccountService } from './services/account.service';
import { Account } from './models/account.model';
import { of, throwError } from 'rxjs';
import { CurrencyPipe, NgIf } from '@angular/common';
import { FinancialStatisticsComponent } from './components/financial-statistics/financial-statistics.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TableComponent } from '../../shared/components/table/table.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { BudgetInputComponent } from '../budget/components/budget-input/budget-input.component';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClient } from '@angular/common/http';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let accountService: jasmine.SpyObj<AccountService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const accountServiceSpy = jasmine.createSpyObj('AccountService', [
      'getAccountDetailsFormatted',
    ]);

    const mockAccountDetails: Account = {
      id: 4,
      balance: 1200,
      currency: 'EUR',
    };

    const mockFormattedAccount = {
      details: mockAccountDetails,
      currencyCode: 'EUR',
    };
    accountServiceSpy.getAccountDetailsFormatted.and.returnValue(
      of(mockFormattedAccount),
    );

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const mockHttpResponse = of(mockFormattedAccount);
    httpClientSpy.get.and.returnValue(mockHttpResponse);

    TestBed.configureTestingModule({
      imports: [
        CurrencyPipe,
        NgIf,
        BudgetInputComponent,
        ButtonComponent,
        TableComponent,
        UserDetailsComponent,
        FinancialStatisticsComponent,
      ],
      providers: [
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(
      AccountService,
    ) as jasmine.SpyObj<AccountService>;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAccountDetails on init', () => {
    const loadAccountDetailsSpy = spyOn(
      component,
      'loadAccountDetails',
    ).and.callThrough();
    component.ngOnInit();
    expect(loadAccountDetailsSpy).toHaveBeenCalled();
  });

  it('should set account details and currency code when loadAccountDetails is called', () => {
    component.loadAccountDetails();
    expect(component.accountDetails).toEqual({
      id: 4,
      balance: 1200,
      currency: 'EUR',
    });
    expect(component.currencyCode).toBe('EUR');
  });

  it('should call AccountService.getAccountDetailsFormatted', () => {
    component.loadAccountDetails();
    expect(accountService.getAccountDetailsFormatted).toHaveBeenCalled();
  });
});
