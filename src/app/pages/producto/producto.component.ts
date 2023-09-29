import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Producto,
  ProductoCreaEdita,
} from 'src/app/interfaces/login.interface'; // Importación de interfaces y módulos necesarios
import { EventService } from 'src/app/services/data.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [],
})
export class ProductoComponent {
  categoriasBd: Array<string> = []; // Arreglo para almacenar categorías desde la base de datos
  categoriasGeneralesModificada: Array<any> = []; // Arreglo para almacenar categorías modificadas

  producto!: Producto; // Variable para almacenar un producto
  cadenaCatagorias!: string; // Variable para almacenar una cadena de categorías
  id: string = ''; // Variable para almacenar el ID del producto
  idUsuarioLogueado!: string;

  productoCreaEdita!: ProductoCreaEdita;

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
  }

  ngOnInit(): void {
    this.eventService.usuario$.subscribe((user) => {
      console.log('user desde cabecera', user);

      this.idUsuarioLogueado = user.uid || '';
    });
    console.log(
      'this.rutaActiva.snapshot.params',
      this.rutaActiva.snapshot.params
    );

    // Consulta las categorías desde el servicio y modifica su estructura
    this.productosService.consultarCategorias().subscribe((res: any) => {
      console.log('cat', res);

      this.categoriasGeneralesModificada = res.categorias.map((objeto: any) => {
        objeto.id = objeto.id;
        objeto.nombre = objeto.nombre;
        objeto.checked = false; // Inicialmente, ninguna categoría está marcada

        return objeto;
      });
    });

    this.consultarProducto();


  }

  consultarProducto(){
        // Consulta un producto por su ID y asigna los datos a variables
        this.productosService.consultarUnProducto(this.id).subscribe((res: any) => {
          console.log('producto', res);
          this.producto = res.producto; // Almacena el producto
          console.log('res.producto.categorias', res.producto.categoria);
    
          this.categoriasBd = res.producto.categoria.map((obj: any) => obj._id); // Obtiene los IDs de las categorías
    
          const nombresCategoria = res.producto.categoria.map(
            (objeto: any) => objeto.nombre
          );
    
          this.cadenaCatagorias = nombresCategoria.join(' | '); // Convierte los nombres de categorías en una cadena
        });
  }

  // Método para cargar los datos en el modal de edición
  cargarDatosModal() {
    console.log('Cargando datos modal');

    this.productoForm.setValue({
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      stock: this.producto.stock,
      imagen: this.producto.imagen,
    });

    console.log('categoriasBd', this.categoriasBd);

    this.categoriasBd.forEach((element) => {
      console.log('element', element);

      // Busca el objeto con el ID correspondiente en categorías generales y marca la casilla
      const checkboxToChange = this.categoriasGeneralesModificada.find(
        (item) => item.id === element
      );

      console.log('checkboxToChange', checkboxToChange);

      if (checkboxToChange) {
        checkboxToChange.checked = true; // Marca la casilla
      }
    });
  }

  // Método para actualizar los datos del producto
  actualizar(evento: any) {
    console.log('actualizando', this.productoForm.value);
    console.log('evento', evento);
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
    console.log('this.idUsuarioLogueado', this.idUsuarioLogueado);

    this.productoCreaEdita = {
      categoria: this.categoriasBd,
      nombre,
      precio,
      stock,
      imagen,
      descripcion,
      usuarioCrea: this.idUsuarioLogueado,
    };

    console.log('productoCreaEdita', this.productoCreaEdita);
    this.productosService
      .actualizarProducto(this.productoCreaEdita, this.id)
      .subscribe((res: any) => {
        console.log('res actualziacion', res);

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
        }
      });
  }

  // Método para manejar el clic en las categorías
  categoriasClick(item: any) {
    console.log('click');

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

    console.log('item', item);
    console.log('this.categoriasBd', this.categoriasBd);
  }

  eliminarProduto(){
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

        this.productosService.eliminarProducto(this.id).subscribe((res:any)=> 
        {
          console.log("res eliminar", res);
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

            this.router.navigateByUrl("/catalogo");
          }
          
        } );;
      } else if (result.isDenied) {
        Swal.fire('No se han hecho cambios', '', 'info')
      }
    })
  }

  
}
