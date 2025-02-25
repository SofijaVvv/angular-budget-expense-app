import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.error('HTTP Error:', err.message);
      if (err.status === 400 && err.error.message) {
        console.error('User error:', err.error.message);
      }
      return throwError(() => err);
    }),
  );
};
