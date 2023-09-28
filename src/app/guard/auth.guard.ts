import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const AuthGuard: CanActivateFn = (route, state) => {
  const servicioAuth = inject(AuthService);
  const rutas = inject(Router);
  const token = localStorage.getItem('token');

  console.log('validando token en localstorage');

  if (!token) {
    let timerInterval: any;

    Swal.fire({
      title: 'Cerrando sesión por seguridad',
      html: 'Vuelve a iniciar sesión',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });

    setTimeout(() => {
      rutas.navigateByUrl('/login');
    }, 1000);
  }

   servicioAuth.validarRenovarToken()?.subscribe((res)=> {

    console.log("res rev", res);
    
   } );
  return true;
};
