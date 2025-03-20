import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';

export const authGuard: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (jwtService.isTokenExpired()) {
    return true;
  } else {
    void router.navigate(['/home']);
    return false;
  }
};
