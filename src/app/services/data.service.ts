import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import {
  Catalogo,
  Producto,
  RootProductos,
} from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private usuarioSubject = new BehaviorSubject<Usuario>({
    correoElectronico: '',
    nombreCompleto: '',
    contrasenia: '',
    google: false,
    img: '',
    rol: '',
    uid: '',
  });

  private productoSubject = new BehaviorSubject<RootProductos>({
    catalogo: [],
    ok: false,
    totalRegistros: 0,
  });

  usuario$ = this.usuarioSubject.asObservable();
  productoList$ = this.productoSubject.asObservable();

  updateUsuario(newUser: Usuario): void {
    this.usuarioSubject.next(newUser);
  }

  updateProducto(listaProductos: RootProductos): void {
    this.productoSubject.next(listaProductos);
  }
}
