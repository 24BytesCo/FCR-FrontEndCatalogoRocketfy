import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { EventService } from 'src/app/services/data.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent {
  isToggled:boolean = false;
  busqueda: string = '';
  busquedaRango: string = '';
  public usuario: Usuario = {
    correoElectronico: '',
    nombreCompleto: '',
    contrasenia: '',
    google: false,
    img: '',
    rol: '',
    uid: '',
  };
  constructor(
    private router: Router,
    private eventService: EventService,
    private productoService: ProductosService
  ) {
  }

  ngOnInit(): void {
    // Suscríbete al observable usuario$ para recibir actualizaciones del usuario global
    this.eventService.usuario$.subscribe((user) => {
      this.usuario = user;
    });

    this.toggleSidebar();
    


  }



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

  toggleSidebar() {
    
    this.isToggled = !this.isToggled;

    this.eventService.updateEstadoSideBarMovil(this.isToggled);
  }

  buscar() {
    if (this.busqueda.trim() == '') {
      this.productoService
        .cargarTodosProductosPaginacion(0)
        .subscribe((res: any) => {
          this.eventService.updateProducto(res);
        });
    } else {
      this.productoService.buscar(this.busqueda).subscribe((res: any) => {
        this.eventService.updateProducto(res);
      });
    }
  }

  buscarRango() {
    this.productoService
      .buscarRango(this.busquedaRango)
      .subscribe((res: any) => {
        this.eventService.updateProducto(res);
      });
  }
}
