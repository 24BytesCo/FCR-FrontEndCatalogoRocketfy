import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';

@NgModule({
  declarations: [InicioComponent, PagesComponent, CatalogoComponent, CrearProductoComponent, GestionProductosComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [InicioComponent, PagesComponent, CatalogoComponent, CrearProductoComponent, GestionProductosComponent],
})
export class PagesModule {}
