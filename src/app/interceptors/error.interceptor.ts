import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message: string;
      if (error.status === 0) {
        message = 'Serveur injoignable';
      } else if (error.error?.message) {
        message = error.error.message;
      } else {
        message = 'Une erreur est survenue';
      }
      console.error(`[HTTP ${error.status}] ${message}`);
      // → afficher un toast / une notification ici
      return throwError(() => error);
    }),
  );
};
