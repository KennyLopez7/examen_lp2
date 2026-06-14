import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const detail = error.error?.detail ?? error.message ?? 'Error desconocido';
      console.error(`[HTTP ${error.status}]`, detail);
      return throwError(() => ({ status: error.status, detail }));
    })
  );
};
