import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { loginReducer } from './core/auth/store/login/login.reducer';
import { provideEffects } from '@ngrx/effects';
import { LoginEffects } from './core/auth/store/login/login.effects';
import { registerReducer } from './core/auth/store/register/register.reducer';
import { RegisterEffects } from './core/auth/store/register/register.effects';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ login: loginReducer, register: registerReducer }),
    provideEffects([LoginEffects, RegisterEffects]),
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor])),
  ],
};
