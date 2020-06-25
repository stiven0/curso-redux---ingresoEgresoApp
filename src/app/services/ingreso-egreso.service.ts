
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

import { map } from 'rxjs/operators';

import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgreso } from '../models/ingreso-egreso';

@Injectable({
    providedIn: 'root'
})

export class IngresoEgresoService {

    constructor(private firestore: AngularFirestore,
                private authService: AuthService){}

    crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {

        delete ingresoEgreso.uid;

        return this.firestore.doc( `${ this.authService.user.uid }/ingreso-egresos` )
            .collection('items')
            .add( { ...ingresoEgreso } );
    }


    initIngresosEgresosListener( uid: string ) {
        return this.firestore.collection(`${ uid }/ingreso-egresos/items`)
        .snapshotChanges()
        .pipe(
            map( snapshot => snapshot.map( doc => ({
                        uid: doc.payload.doc.id,
                        ...doc.payload.doc.data() as any
                    })
                )
            )
        );
    }


    borrarIngresoEgreso( uidItem: string ) {
        return this.firestore.doc(`${ this.authService.user.uid }/ingreso-egresos/items/${ uidItem }`).delete();
    }
}
