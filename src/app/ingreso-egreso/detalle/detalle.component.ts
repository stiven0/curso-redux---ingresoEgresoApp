import { Component, OnInit, OnDestroy } from '@angular/core';

import { IngresoEgreso } from '../../models/ingreso-egreso';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[] = [];
  private _destroyed$ = new Subject();

  constructor( private store: Store<AppStateWithIngreso>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.store.select('ingresosEgresos')
    .pipe( takeUntil( this._destroyed$ ) )
    .subscribe( ({ items }) => this.ingresosEgresos = items );
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  borrar( uid: string) {
    console.log(uid);
    this.ingresoEgresoService.borrarIngresoEgreso( uid )
        .then( () => Swal.fire( 'Borrado', 'item borrado', 'success' ) )
        .catch( err => Swal.fire( 'Error', err.message, 'error' ) );

  }

}
