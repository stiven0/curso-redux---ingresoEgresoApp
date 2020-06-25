import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IngresoEgreso } from '../models/ingreso-egreso';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';

import Swal from 'sweetalert2';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actionsUI from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;

  private _destroyed$ = new Subject();

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.store.select('ui')
    .pipe( takeUntil(this._destroyed$) )
    .subscribe( ({ isLoading }) => this.cargando = isLoading );
}

ngOnDestroy() {
  this._destroyed$.next();
  this._destroyed$.complete();
}

  guardar() {

    if (this.ingresoForm.invalid) { return; }

    this.store.dispatch( actionsUI.isLoading() );

    console.log(this.ingresoForm.value);
    console.log(this.tipo );

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
        .then( () => {
          this.store.dispatch( actionsUI.stopLoading() );
          this.ingresoForm.reset();
          Swal.fire('Registro creado', descripcion, 'success');
        })
        .catch(err => {
          this.store.dispatch( actionsUI.stopLoading() );
          Swal.fire('Error', err.message, 'error');
        });
  }

}

