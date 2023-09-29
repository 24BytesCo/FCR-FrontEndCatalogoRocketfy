import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private usuarioSubject = new BehaviorSubject<Usuario>( {
    correoElectronico: '',
    nombreCompleto: '',
    contrasenia: '',
    google: false,
    img: '',
    rol: '',
    uid: '',
  });
  usuario$ = this.usuarioSubject.asObservable();

  updateUsuario(newUser: Usuario): void {
    console.log("actualizando usuario", newUser);
    
    this.usuarioSubject.next(newUser);
  }
}