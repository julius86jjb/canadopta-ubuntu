export class Usuario {

    constructor(

        public email: string,
        public password: string,
        public verificado: boolean,
        public role?: string,
        public perfil_ok?: boolean,
        public nombre?: string,
        public apellidos?: string,
        public telefono?: string,
        public img?: string,
        public google?: boolean,
        public ultimaConexion?: string,
        public centrosLiked?: string[],
        public _id?: string,

    ) { }
}


