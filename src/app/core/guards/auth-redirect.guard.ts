import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';

export const authRedirectGuard: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.getToken() && !jwtService.isTokenExpired()) {
    void router.navigate(['/home']);
    return false;
  }
  return true;
};
