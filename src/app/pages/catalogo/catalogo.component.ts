import { Component } from '@angular/core';
import {
  Catalogo,
  Categorum,
  RootProductos,
  UsuarioCrea,
} from 'src/app/interfaces/login.interface';
import { EventService } from 'src/app/services/data.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styles: [],
})
export class CatalogoComponent {
  constructor(
    private productosService: ProductosService,
    private eventService: EventService
  ) {}
  listaProductos: Array<Catalogo> = [];

  caro: Catalogo = {
    activo: false,
    categoria: [],
    descripcion: '',
    id: '',
    imagen: '',
    nombre: '',
    precio: 0,
    stock: 0,
    usuarioCrea: {
      _id: '',
      nombreCompleto: '',
    },
  };
  barato: Catalogo = {
    activo: false,
    categoria: [],
    descripcion: '',
    id: '',
    imagen: '',
    nombre: '',
    precio: 0,
    stock: 0,
    usuarioCrea: {
      _id: '',
      nombreCompleto: '',
    },
  };
  totalRegistros: string = '0';
  desde: number = 0;
  rango: Number = 0;
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
  antes: boolean = false;
  despues: boolean = false;
  ngOnInit(): void {
    this.eventService.productoList$.subscribe((res: any) => {
      this.listaProductos = res.catalogo;
      this.totalRegistros = res.totalRegistros
        ? res.totalRegistros.toString()
        : res.catalogo.length.toString();

      if (Number(this.totalRegistros) < 6) {
        this.despues = true;
        this.antes = true;
      } else {
        this.despues = false;
        this.antes = false;
      }
    });
    this.listarTodosProductos();
    this.productoMasCaroMasBarato();
  }

  listarTodosProductos() {
    this.productosService
      .cargarTodosProductosPaginacion(this.desde)
      .subscribe((res: RootProductos) => {
        if (res.catalogo.length !== 0) {
          this.listaProductos = res.catalogo;
        }

        this.totalRegistros = res.totalRegistros.toString();
        if (Number(this.totalRegistros) < 6) {
          this.despues = true;
          this.antes = true;
        } else {
          this.despues = false;
          this.antes = false;
        }
      });
  }

  previsualizar(producto: Catalogo) {
    this.productoPrevisualizar = producto;

    // Utiliza map() para obtener un array de nombres de categorias
    const nombresCategoria = producto.categoria.map((objeto) => objeto.nombre);

    this.cadenaCatagorias = nombresCategoria.join(' | ');
  }

  paginacion(valor: number) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
    } else if (this.desde > Number(this.totalRegistros)) {
      this.desde -= valor;
    }

    this.listarTodosProductos();
  }

  productoMasCaroMasBarato() {
    this.productosService.consultarMasBaratomasCaro().subscribe((res: any) => {
      this.caro = res.productoMasCaro;
      this.barato = res.productoBarato;
    });
  }
}
