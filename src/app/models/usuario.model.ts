

export class Usuario {

    static formFirebase( { uid, name, email } ) {
        return new Usuario( uid, name, email );
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string
    ){}

}

