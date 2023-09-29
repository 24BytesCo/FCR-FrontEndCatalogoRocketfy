import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoCreaEdita } from 'src/app/interfaces/login.interface';
import { EventService } from 'src/app/services/data.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styles: [],
})
export class CrearProductoComponent {
  // Declaración de un FormGroup para el formulario de producto
  public productoForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]], // Campo de nombre con validaciones
    descripcion: ['', [Validators.required]], // Campo de descripción con validaciones
    precio: ['', [Validators.required]], // Campo de precio con validaciones
    stock: ['', [Validators.required]], // Campo de stock con validaciones
    imagen: ['', [Validators.required]], // Campo de imagen con validaciones
  });
  categoriasGeneralesModificada: Array<any> = []; // Arreglo para almacenar categorías modificadas
  categoriasBd: Array<string> = []; // Arreglo para almacenar categorías desde la base de datos
  productoCreaEdita!: ProductoCreaEdita;
  idUsuarioLogueado!: string;

  constructor(
    private formBuilder: FormBuilder,
    private productosService: ProductosService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.usuario$.subscribe((user) => {
      console.log('user desde cabecera', user);

      this.idUsuarioLogueado = user.uid || '';
    });
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

  crearProducto(evento: any) {
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
    .crearProducto(this.productoCreaEdita)
    .subscribe((res: any) => {
      console.log('res crear', res);

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
          title: 'Producto creado',
        });

        this.router.navigateByUrl("/catalogo/producto/"+res.producto.id);

      }
    });
  }
}
