import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './core/auth/store/auth.effects';
import { authReducer } from './core/auth/store/auth.reducer';
import { localStorageSyncReducer } from './store/local-storage.reducer';
import { apiInterceptor } from './core/interceptors/api.interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { transactionReducer } from './features/transactions/store/transaction.reducer';
import { TransactionEffects } from './features/transactions/store/transaction.effects';
import { budgetReducer } from './features/budget/store/budget.reducer';
import { BudgetEffects } from './features/budget/store/budget.effects';

const reducers = {
  auth: authReducer,
  transactions: transactionReducer,
  router: routerReducer,
  budgets: budgetReducer,
};
const metaReducers = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideEffects([AuthEffects, TransactionEffects, BudgetEffects]),
    provideHttpClient(
      withInterceptors([
        tokenInterceptor,
        errorInterceptor,
        apiInterceptor,
        spinnerInterceptor,
      ]),
    ),
    importProvidersFrom(StoreRouterConnectingModule.forRoot()),
    importProvidersFrom(
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
      }),
    ),
  ],
};
