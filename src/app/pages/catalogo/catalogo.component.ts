import { Component } from '@angular/core';
import {
  Catalogo,
  Categorum,
  RootProductos,
  UsuarioCrea,
} from 'src/app/interfaces/login.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styles: [],
})
export class CatalogoComponent {
  constructor(private productosService: ProductosService) {}
  listaProductos: Array<Catalogo> = [];

  categoria: Array<Categorum> = [
    {
      _id: '',
      nombre: '',
    },
  ];

  usuarioCrea: UsuarioCrea = {
    _id: '',
    nombreCompleto: '',
  };
  productoPrevisualizar: Catalogo = {
    activo: true,
    categoria: this.categoria,
    descripcion: '',
    id: '',
    imagen: '',
    nombre: '',
    precio: 0,
    stock: 0,
    usuarioCrea: this.usuarioCrea,
  };
  cadenaCatagorias: string = '';

  ngOnInit(): void {
    this.productosService
      .cargarTodosProductosPaginacion(10)
      .subscribe((res: RootProductos) => {
        console.log('res', res);

        this.listaProductos = res.catalogo;
      });
  }

  previsualizar(producto: Catalogo) {
    this.productoPrevisualizar = producto;

    // Utiliza map() para obtener un array de nombres de categorias
    const nombresCategoria =  producto.categoria.map((objeto) => objeto.nombre);

    this.cadenaCatagorias =nombresCategoria.join(' | ');
    console.log('previsualizando ', producto);
  }
}
