import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

const showErrorAlert = (
  title: string,
  text: string,
  timer = 2000,
  showConfirmButton = true,
) => {
  return Swal.fire({ icon: 'error', title, text, timer, showConfirmButton });
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err) => {
      const { status, error } = err;
      console.error('User error:', error?.message || 'Unknown error');

      switch (status) {
        case 400:
          void showErrorAlert('Error', error?.message, 3000);
          break;
        case 401:
          void showErrorAlert(
            'Token expired',
            'Please log in again if you want to continue',
            2000,
            false,
          ).then(() => {
            void router.navigate(['/login']);
          });
          break;
        default:
          void showErrorAlert('Error', 'An unexpected error occurred!');
      }

      return throwError(() => err);
    }),
  );
};
