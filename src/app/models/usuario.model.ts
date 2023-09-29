export class Usuario {


    constructor (
        public nombreCompleto:string,
        public correoElectronico:string,
        public rol?: string,
        public contrasenia?: string,
        public google?: boolean,
        public uid?: string,
        public img?: string
    ){}

    
}


  