import { ChangeDetectorRef, Component } from '@angular/core';
import { EventService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Catalogo Rocketfy'; // Define una propiedad 'title' con el valor 'Catalogo Rocketfy'.
  ocultarSpinner: boolean = true; // Define una propiedad 'ocultarSpinner' como booleana y la inicializa en 'true'.

  constructor(
    private eventService: EventService,
    private cdr: ChangeDetectorRef
  ) {} // Inyecta el servicio 'EventService' en el constructor del componente.
  ngOnInit(): void {
    // Suscríbete al flujo de datos 'ocultarSpinner$' del servicio 'EventService'.
    this.eventService.ocultarSpinner$.subscribe((res) => {
      // Cuando se emita un valor en 'ocultarSpinner$', actualiza la propiedad 'ocultarSpinner' con ese valor.
      this.ocultarSpinner = res;
      // Forzar una nueva detección de cambios
      this.cdr.detectChanges();
    });
  }
}
