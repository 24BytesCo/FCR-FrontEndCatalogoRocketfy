import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';
import { AuthGuard } from '../guard/auth.guard';
import { PersistenciaDatahGuard } from '../guard/persistencia-data.guard';
import { ProductoComponent } from './producto/producto.component';
import { RouterModule, Routes } from '@angular/router';

const rutasHijas: Routes = [
  {
    path: '',
    component: CatalogoComponent,
    canActivate: [PersistenciaDatahGuard],
  },
  {
    path: 'producto/:id',
    component: ProductoComponent,
    canActivate: [PersistenciaDatahGuard]

  },
  {
    path: 'nuevo-producto',
    component: CrearProductoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gestion-productos',
    component: GestionProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(rutasHijas)
  ],
  exports: [RouterModule],
})
export class RutasHijasModule { }
