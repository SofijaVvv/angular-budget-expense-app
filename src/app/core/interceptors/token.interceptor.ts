import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../auth/services/jwt.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const token = jwtService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
