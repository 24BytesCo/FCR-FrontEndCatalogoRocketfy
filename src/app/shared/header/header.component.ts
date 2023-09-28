import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // Método para cerrar la sesión del usuario.
  cerrarSesion() {
    // Muestra una notificación de éxito con el nombre del usuario.
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Cerrando sesión',
    });

    // Elimina el token de autenticación almacenado en el localStorage.
    localStorage.removeItem('token');

    // Redirige al usuario a la página de inicio de sesión.
    this.router.navigateByUrl('/login');
  }
}
