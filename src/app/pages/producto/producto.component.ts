import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Producto,
  ProductoCreaEdita,
  RespuesuHisoricoPrecio,
  RespuesuHisoricoStock,
  RootHistoricoStock,
  RootProductos,
} from 'src/app/interfaces/login.interface'; // Importación de interfaces y módulos necesarios
import { EventService } from 'src/app/services/data.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
import { RootHistoricoPrecios } from '../../interfaces/login.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [],
})
export class ProductoComponent {
  categoriasBd: Array<string> = []; // Arreglo para almacenar categorías desde la base de datos
  categoriasGeneralesModificada: Array<any> = []; // Arreglo para almacenar categorías modificadas

  producto: Producto = {
    activo: false,
    _id: "",
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
  }; // Variable para almacenar un producto
  cadenaCatagorias: string = "" // Variable para almacenar una cadena de categorías
  id: string = ''; // Variable para almacenar el ID del producto
  idUsuarioLogueado: string = "";

  productoCreaEdita: ProductoCreaEdita = {
    categoria: [],
    descripcion: '',
    imagen: '',
    nombre: '',
    precio: 0,
    stock: 0,
    usuarioCrea: ""
  
  };;
  historicoPrecios: Array<RespuesuHisoricoPrecio>= [];
  historicoStock: Array<RespuesuHisoricoStock> = [];

  // Declaración de un FormGroup para el formulario de producto
  public productoForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]], // Campo de nombre con validaciones
    descripcion: ['', [Validators.required]], // Campo de descripción con validaciones
    precio: ['', [Validators.required]], // Campo de precio con validaciones
    stock: ['', [Validators.required]], // Campo de stock con validaciones
    imagen: ['', [Validators.required]], // Campo de imagen con validaciones
  });

  idsCategoriasSeleccionados: Array<string> = []; // Arreglo para IDs de categorías seleccionadas

  constructor(
    private productosService: ProductosService, // Servicio para gestionar productos
    private rutaActiva: ActivatedRoute, // Para obtener el parámetro 'id' de la URL
    private formBuilder: FormBuilder, // Para construir el formulario,
    private eventService: EventService,
    private router: Router
  ) {
    const { id } = this.rutaActiva.snapshot.params; // Obtiene el valor del parámetro 'id' de la URL
    this.id = id; // Almacena el valor en la variable 'id'
    this.eventService.usuario$.subscribe((user) => {
      this.idUsuarioLogueado = user.uid || '';
    });
  }

  ngOnInit(): void {
    // Consulta las categorías desde el servicio y modifica su estructura
    this.productosService.consultarCategorias().subscribe((res: any) => {
      this.categoriasGeneralesModificada = res.categorias.map((objeto: any) => {
        objeto.id = objeto.id;
        objeto.nombre = objeto.nombre;
        objeto.checked = false; // Inicialmente, ninguna categoría está marcada

        return objeto;
      });
    });

    this.consultarProducto();
  }
  ngAfterViewInit(): void {
    if (this.idUsuarioLogueado && this.idUsuarioLogueado != '') {
      this.consultarHistoricoPrecioProducto();
      this.consultarHistoricoStockProducto();
    }
  }

  consultarProducto() {
    // Consulta un producto por su ID y asigna los datos a variables
    this.productosService.consultarUnProducto(this.id).subscribe((res: any) => {
      this.producto = res.producto; // Almacena el producto

      this.categoriasBd = res.producto.categoria.map((obj: any) => obj._id); // Obtiene los IDs de las categorías

      const nombresCategoria = res.producto.categoria.map(
        (objeto: any) => objeto.nombre
      );

      this.cadenaCatagorias = nombresCategoria.join(' | '); // Convierte los nombres de categorías en una cadena
    });
  }

  // Método para cargar los datos en el modal de edición
  cargarDatosModal() {
    this.productoForm.setValue({
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      stock: this.producto.stock,
      imagen: this.producto.imagen,
    });

    this.categoriasBd.forEach((element) => {
      // Busca el objeto con el ID correspondiente en categorías generales y marca la casilla
      const checkboxToChange = this.categoriasGeneralesModificada.find(
        (item) => item.id === element
      );

      if (checkboxToChange) {
        checkboxToChange.checked = true; // Marca la casilla
      }
    });
  }

  // Método para actualizar los datos del producto
  actualizar(evento: any) {
    if (!this.productoForm.valid) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'error',
        title: 'Formulario erroneo, por favor verifica',
      });
      return;
    }

    if (this.categoriasBd.length == 0) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'error',
        title: 'Debes seleccionar al menos una categoría',
      });
      return;
    }

    const { nombre, precio, stock, imagen, descripcion } =
      this.productoForm.getRawValue();

    this.productoCreaEdita = {
      categoria: this.categoriasBd,
      nombre,
      precio,
      stock,
      imagen,
      descripcion,
      usuarioCrea: this.idUsuarioLogueado,
    };

    this.productosService
      .actualizarProducto(this.productoCreaEdita, this.id)
      .subscribe((res: any) => {
        if (res.ok) {
          const btn = document.getElementById('cerrarModal');
          btn?.click();

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });

          Toast.fire({
            icon: 'success',
            title: 'Producto modificado',
          });

          this.consultarProducto();
          this.consultarHistoricoPrecioProducto();
          this.consultarHistoricoStockProducto();
        }
      });
  }

  // Método para manejar el clic en las categorías
  categoriasClick(item: any) {

    // Verifica si la categoría ya está en la lista de categorías del producto
    if (this.categoriasBd.includes(item.id)) {
      // Si está, la remueve
      this.categoriasBd = this.categoriasBd.filter(
        (valor) => valor !== item.id
      );
    } else {
      // Si no está, la agrega
      this.categoriasBd.push(item.id);
    }

  }

  eliminarProduto() {
    Swal.fire({
      title: '¿Esta seguro que desea eliminar éste producto?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Eliminando producto', '', 'success');

        this.productosService
          .eliminarProducto(this.id)
          .subscribe((res: any) => {
            if (res.ok) {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: 'success',
                title: 'Producto eliminado',
              });

              this.router.navigateByUrl('/catalogo');
            }
          });
      } else if (result.isDenied) {
        Swal.fire('No se han hecho cambios', '', 'info');
      }
    });
  }

  formatearFecha(fechaStr: string): string {
    const fecha = new Date(fechaStr);

    // Obtén el día, mes y año
    const dia = fecha.getDate();
    const mes = fecha.toLocaleString('default', { month: 'long' });
    const anio = fecha.getFullYear();

    // Obtén la hora y los minutos
    let hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    let ampm = 'AM';

    // Ajusta la hora para el formato de 12 horas y determina AM o PM
    if (hora >= 12) {
      hora -= 12;
      ampm = 'PM';
    }

    // Formatea la hora y los minutos con ceros iniciales si es necesario
    const horaStr = hora.toString().padStart(2, '0');
    const minutosStr = minutos.toString().padStart(2, '0');

    // Construye la cadena de fecha y hora formateada
    const fechaFormateada = `${dia} de ${mes} de ${anio} - Hora: ${horaStr}:${minutosStr} ${ampm}`;

    return fechaFormateada;
  }

  consultarHistoricoPrecioProducto() {

    this.productosService
      .consultarHistorialPrecios(this.id)
      .subscribe((res: RootHistoricoPrecios) => {

        this.historicoPrecios = res.respuesta;
      });
  }
  consultarHistoricoStockProducto() {
    this.productosService
      .consultarHistorialStock(this.id)
      .subscribe((res: RootHistoricoStock) => {
        this.historicoStock = res.respuesta;
      });
  }
}
