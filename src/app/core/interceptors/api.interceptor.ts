import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = environment.baseUrl;
  const apiReq = req.clone({ url: `${apiUrl}/${req.url}` });
  return next(apiReq);
};
