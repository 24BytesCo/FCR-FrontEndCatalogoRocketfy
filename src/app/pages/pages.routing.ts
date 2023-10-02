import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';


const routes: Routes = [
  {
    path: 'catalogo',
    component: PagesComponent,
   loadChildren: ()=> import("./rutas-hijas.module").then(m=> m.RutasHijasModule ) 
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
