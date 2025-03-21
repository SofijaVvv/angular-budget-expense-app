import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { showErrorAlert } from '../../utils/alert-utils';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      const { status, error } = err;
      console.error('User error:', error?.message || 'Unknown error');

      switch (status) {
        case 400:
          void showErrorAlert('Error', error?.message, 3000);
          break;
        case 404:
          void showErrorAlert(
            'Not Found',
            'The server can not find the requested resource.',
            3000,
          );
          break;
        default:
          void showErrorAlert('Error', 'An unexpected error occurred!');
      }

      return throwError(() => err);
    }),
  );
};
