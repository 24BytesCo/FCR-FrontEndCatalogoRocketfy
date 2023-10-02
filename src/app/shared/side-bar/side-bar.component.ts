import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { EventService } from 'src/app/services/data.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [],
})
export class SideBarComponent {
  isToggled = false;


  public usuario: Usuario = {
    correoElectronico: '',
    nombreCompleto: '',
    contrasenia: '',
    google: false,
    img: '',
    rol: '',
    uid: '',
  };

  constructor(private eventService: EventService) {}
  ngOnInit(): void {
    // Suscríbete al observable usuario$ para recibir actualizaciones del usuario global
    this.eventService.usuario$.subscribe((user) => {
      this.usuario = user;
    });

    this.eventService.sideBarMovilEstado$.subscribe((res)=> 
    {
      this.isToggled = res;
    } );
  }

  onClick(evento: any) {
    

    document.body.classList.toggle('sidebar-toggled');
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('toggled');
      if (sidebar.classList.contains('toggled')) {
        const sidebarCollapse = document.querySelectorAll('.sidebar .collapse');
        sidebarCollapse.forEach((item: any) => {
          item.classList.remove('show');
        });
      }
    }
  }
}
