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

  private sideBarMovilEstadoSubject = new BehaviorSubject<boolean>(false);
  private ocultarSpinnerSubject = new BehaviorSubject<boolean>(true);

  private productoSubject = new BehaviorSubject<RootProductos>({
    catalogo: [],
    ok: false,
    totalRegistros: 0,
  });

  usuario$ = this.usuarioSubject.asObservable();
  sideBarMovilEstado$ = this.sideBarMovilEstadoSubject.asObservable();
  productoList$ = this.productoSubject.asObservable();
  ocultarSpinner$ = this.ocultarSpinnerSubject.asObservable();


  updateUsuario(newUser: Usuario): void {
    this.usuarioSubject.next(newUser);
  }

  updateProducto(listaProductos: RootProductos): void {
    this.productoSubject.next(listaProductos);
  }

  updateEstadoSideBarMovil(abierta: boolean): void {
    this.sideBarMovilEstadoSubject.next(abierta);
  }

  updateOcultarSpinner(ocultar: boolean): void {
    this.ocultarSpinnerSubject.next(ocultar);
  }
  
}
