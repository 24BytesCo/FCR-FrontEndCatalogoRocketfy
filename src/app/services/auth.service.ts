import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/login.interface';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { EventService } from './data.service';

// Obtén la URL base del entorno desde environment.ts
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private eventService: EventService
  ) {}

  // Método para iniciar sesión
  login(formData: LoginForm) {
    // Realiza una solicitud POST al servidor para iniciar sesión
    return this.http.post(`${base_url}/login`, formData).pipe(
      // Realiza una acción secundaria después de recibir la respuesta
      tap((resp: any) => {
        // Almacena el token de autenticación en el almacenamiento local (localStorage)
        localStorage.setItem('token', resp.token);

        //Llama al servicio para actualizar el usuario global
        this.eventService.updateUsuario(resp.usuario);
      })
    );
  }

  // Método para validar y renovar el token de autenticación.
  validarRenovarToken(): Observable<boolean> {
    // Obtiene el token de autenticación almacenado en el localStorage o una cadena vacía si no existe.
    const token = localStorage.getItem('token') || '';

    // Realiza una solicitud HTTP GET al servidor para renovar el token de autenticación.
    return this.http
      .get(`${base_url}/login/renovar`, {
        headers: {
          'ad-token': token, // Agrega el token actual como encabezado en la solicitud.
        },
      })
      .pipe(
        // Realiza una acción secundaria después de recibir la respuesta del servidor.
        tap((resp: any) => {
          // Almacena el nuevo token de autenticación en el almacenamiento local (localStorage).
          localStorage.setItem('token', resp.token);
          //Llama al servicio para actualizar el usuario global
          this.eventService.updateUsuario(resp.usuario);
        }),
        // Mapea la respuesta a un valor booleano 'true' para indicar que la renovación fue exitosa.
        map((resp) => true),
        // Maneja cualquier error que ocurra durante la solicitud y devuelve 'false' en caso de error.
        catchError((error) => of(false))
      );
  }
}
