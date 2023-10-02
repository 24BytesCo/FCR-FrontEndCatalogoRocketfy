import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const PersistenciaDatahGuard: CanActivateFn = (route, state) => {
  const servicioAuth = inject(AuthService);
  const ruta = state.url;

  if (state.url.indexOf('catalogo/producto/') !== -1) {
    // No realices la validación en esta ruta, simplemente permite el acceso
    return true;
  }
  const token = localStorage.getItem('token');

  if (!token) {
    return true;
  }
  servicioAuth.validarRenovarToken()?.subscribe((res) => {
    if (!res && token) {
      localStorage.removeItem('token');
    }
  });
  return true;
};
