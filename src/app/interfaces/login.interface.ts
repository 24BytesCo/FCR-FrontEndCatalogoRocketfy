
export interface LoginForm
{
    contrasenia: string;
    correoElectronico: string;
}

export interface RequestResult {
    ok: boolean
    token: string
    usuario: UsuarioInterface
  }
  
  export interface UsuarioInterface {
    nombreCompleto: string
    correoElectronico: string
    google: boolean
    rol: string
    activo: boolean
    uid: string
    img: string
  }

  export interface RootProductos {
    ok: boolean
    catalogo: Catalogo[]
    totalRegistros: number
  }
  
  export interface Catalogo {
    nombre: string
    descripcion: string
    precio: number
    stock: number
    imagen: string
    categoria: Categorum[]
    usuarioCrea: UsuarioCrea
    activo: boolean
    id: string
  }

  export interface Producto {
    nombre: string
    descripcion: string
    precio: number
    stock: number
    imagen: string
    categoria: Categorum[]
    usuarioCrea: UsuarioCrea
    activo: boolean
    id: string
  }
  
  export interface Categorum {
    _id: string
    nombre: string
  }

  export interface Categorias {
    id: string
    nombre: string
  }
  
  export interface UsuarioCrea {
    _id: string
    nombreCompleto: string
  }
  export interface ProductoCreaEdita {
    nombre: string
    descripcion: string
    precio: number
    stock: number
    imagen: string
    categoria: string[]
    usuarioCrea: string
  }
  

  export interface RootHistoricoStock {
    ok: boolean;
    respuesta: RespuesuHisoricoStock[];
  }
  export interface RootHistoricoPrecios {
    ok: boolean;
    respuesta: RespuesuHisoricoPrecio[];
  }
  
  export interface RespuesuHisoricoStock {
    producto: Producto
    stockAntiguo: number
    stockNuevo: number
    usuarioCrea: UsuarioCrea
    activo: boolean
    fechaCreacion: string
    id: string
  }
  
  export interface RespuesuHisoricoPrecio {
    producto: Producto
    precioAntiguo: number
    precioNuevo: number
    usuarioCrea: UsuarioCrea
    activo: boolean
    fechaCreacion: string
    id: string
  }
  
  export interface Producto {
    _id: string
    nombre: string
  }
  
  export interface UsuarioCrea {
    _id: string
    nombreCompleto: string
  }
  