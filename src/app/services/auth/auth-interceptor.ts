import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const email = localStorage.getItem('userEmail');

  if (email && req.url.includes('/products')) {
    const clonedReq = req.clone({
      setHeaders: {
        'X-User-Email': email
      }
    });
    return next(clonedReq);
  }

  return next(req);
};
