import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductoCreaEdita, RootProductos } from '../interfaces/login.interface';
// Obtén la URL base del entorno desde environment.ts
const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

constructor(private http: HttpClient) { }

cargarTodosProductosPaginacion(hasta:number): Observable<any>{
  return this.http.get(`${base_url}/productos?hasta=${hasta}`);
}

consultarUnProducto(id:string){
  return this.http.get(`${base_url}/productos/${id}`);

}

consultarCategorias(){
  return this.http.get(`${base_url}/categorias`);

}
actualizarProducto(producto: ProductoCreaEdita, idProducto:string){
  return this.http.put(`${base_url}/productos/${idProducto}`, producto);

}

eliminarProducto(idProducto:string){
  return this.http.delete(`${base_url}/productos/${idProducto}`);

}
}
