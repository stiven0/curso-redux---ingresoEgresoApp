

export class Usuario {

    static formFirebase( { uid, nombre, email } ) {
        return new Usuario( uid, nombre, email );
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}

}

