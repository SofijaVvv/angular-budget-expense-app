import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';
import { SpinnerStoreService } from '../../shared/components/spinner/spinner-store.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingStore = inject(SpinnerStoreService);

  loadingStore.show();
  return next(req).pipe(finalize(() => loadingStore.hide()));
};
