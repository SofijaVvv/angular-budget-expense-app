import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { loginReducer } from './core/auth/store/login/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './core/auth/store/login/login.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ login: loginReducer }),
    provideEffects([LoginEffects]),
    provideHttpClient(withInterceptors([tokenInterceptor])),
  ],
};
