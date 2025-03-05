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

const reducers = {
  auth: authReducer,
  router: routerReducer,
};
const metaReducers = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideEffects([AuthEffects]),
    provideHttpClient(
      withInterceptors([tokenInterceptor, errorInterceptor, apiInterceptor]),
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
