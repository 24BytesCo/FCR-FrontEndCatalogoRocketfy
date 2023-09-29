import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoCreaEdita, RootHistoricoPrecios, RootHistoricoStock } from '../interfaces/login.interface';
// Obtén la URL base del entorno desde environment.ts
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

constructor(private http: HttpClient) { }

cargarTodosProductosPaginacion(desde:number): Observable<any>{
  return this.http.get(`${base_url}/productos?desde=${desde}`);
}

consultarUnProducto(id:string){
  return this.http.get(`${base_url}/productos/${id}`);

}
consultarHistorialPrecios(id: string): Observable<RootHistoricoPrecios> {
  const token = localStorage.getItem('token') || '';

  return this.http.get(`${base_url}/productos/historico-precios/${id}`, 
  {
    headers: 
    {
      "ad-token": token
    }
  }) as Observable<RootHistoricoPrecios>;
}

consultarHistorialStock(id: string): Observable<RootHistoricoStock> {
  const token = localStorage.getItem('token') || '';

  return this.http.get(`${base_url}/productos/historico-stock/${id}`, 
  {
    headers: 
    {
      "ad-token": token
    }
  }) as Observable<RootHistoricoStock>;
}


buscar(busqueda:string){
  return this.http.get(`${base_url}/productos/busqueda/${busqueda}`);

}

buscarRango(busqueda:string){
  return this.http.get(`${base_url}/productos/busqueda-rango/${busqueda}`);

}
consultarCategorias(){
  return this.http.get(`${base_url}/categorias`);

}

consultarMasBaratomasCaro(){
  return this.http.get(`${base_url}/productos/busqueda-barato-caro`);

}
actualizarProducto(producto: ProductoCreaEdita, idProducto:string){
  return this.http.put(`${base_url}/productos/${idProducto}`, producto);

}

crearProducto(producto: ProductoCreaEdita){
  return this.http.post(`${base_url}/productos`, producto);

}

eliminarProducto(idProducto:string){
  return this.http.delete(`${base_url}/productos/${idProducto}`);

}
}
