import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { GestionProductosComponent } from './gestion-productos/gestion-productos.component';

const routes: Routes = [
  {
    path: 'catalogo',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: CatalogoComponent,
      },
      {
        path: 'nuevo-producto',
        component: CrearProductoComponent,
      },
      {
        path: 'gestion-productos',
        component: GestionProductosComponent,
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
    ],
  },
  {
    path: "",
    redirectTo: "/catalogo",
    pathMatch: 'full',

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
