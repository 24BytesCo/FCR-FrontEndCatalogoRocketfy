import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const PersistenciaDatahGuard: CanActivateFn = (route, state) => {
  const servicioAuth = inject(AuthService);

  servicioAuth.validarRenovarToken()?.subscribe((res) => {});
  return true;
};
