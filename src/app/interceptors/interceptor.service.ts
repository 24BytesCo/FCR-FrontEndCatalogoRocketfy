import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventService } from '../services/data.service';

@Injectable({ providedIn: 'root' }) // Marca este servicio como inyectable y disponible en toda la aplicación.
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router, private eventService: EventService) {}

  // Este método se llama cada vez que se realiza una solicitud HTTP.
  intercept(
    req: HttpRequest<any>, // La solicitud original que se está interceptando.
    next: HttpHandler // El siguiente controlador en la cadena de interceptores.
  ): Observable<HttpEvent<any>> {
    this.eventService.updateOcultarSpinner(false); // Llama a un servicio para mostrar un spinner mientras se realiza la solicitud.

    const reqClone = req.clone(); // Clona la solicitud original para realizarla sin modificar la original.

    // Envía la solicitud clonada al siguiente controlador y realiza tareas adicionales cuando se complete.
    return next
      .handle(reqClone)
      .pipe(finalize(() => this.eventService.updateOcultarSpinner(true)));
  }
}
