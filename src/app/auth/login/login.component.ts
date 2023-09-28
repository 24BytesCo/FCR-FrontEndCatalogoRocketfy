import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  formularioEnviado: boolean = false;

  // Define un formulario reactivo para el inicio de sesión
  public loginForm: FormGroup = this.formBuilder.group({
    correoElectronico: [
      'Alexis@sadasd.com', // Valor inicial del campo de correo
      [Validators.email, Validators.required, Validators.minLength(3)], // Validadores
    ],
    contrasenia: ['123456', [Validators.required, Validators.minLength(3)]], // Valor inicial del campo de contraseña y validadores
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Método llamado al intentar iniciar sesión
  login() {
    this.formularioEnviado = true; // Marca el formulario como enviado

    // Si el formulario es inválido, no hagas nada
    if (this.loginForm.invalid) {
      return;
    }

    // Llama al servicio de autenticación para iniciar sesión
    this.authService.login(this.loginForm.value).subscribe(
      (resp: any) => {

        // Después de un inicio de sesión exitoso, redirige al usuario a la página de inicio.
       
        this.router.navigate(['/catalogo']);
        // Muestra una notificación de éxito con el nombre del usuario
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
          title: 'Hola ' + resp.nombreCompleto,
        });
      },
      (err) => {
        // Muestra un mensaje de error en caso de autenticación fallida
        Swal.fire({
          title: '¡Error de Autenticación!',
          text: err.error.mensaje,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  // Método para verificar si un campo del formulario es inválido
  campoNoValido(nombreCampo: string): boolean {
    if (this.loginForm.get(nombreCampo)?.invalid && this.formularioEnviado) {
      return true;
    }
    return false;
  }
}
