// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable({ providedIn: 'root' })
// export class InterceptorService implements HttpInterceptor {

//   constructor(private router: Router) { }



//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

//     const reqClone = req.clone({    });

//     return next.handle( reqClone ).pipe(
//       catchError( this.manejarError )
//     );


//   }


//   manejarError( error: HttpErrorResponse ) {

//     console.warn(error);
//     return throwError('Error personalizado');
//   }

// }