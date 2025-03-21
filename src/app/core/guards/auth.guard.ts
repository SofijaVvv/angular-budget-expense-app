import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';
import { UserFacade } from '../auth/services/user.facade';
import { showErrorAlert } from '../../utils/alert-utils';

export const authGuard: CanActivateFn = () => {
  const jwtService = inject(JwtService);
  const userFacede = inject(UserFacade);

  if (jwtService.isTokenExpired()) {
    void showErrorAlert('Unauthorized', 'Please log in to continue', 3000);
    jwtService.destroyToken();
    userFacede.logout();
    return false;
  }
  return true;
};
