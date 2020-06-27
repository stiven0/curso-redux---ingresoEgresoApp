import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

import { IngresoEgreso } from '../../models/ingreso-egreso';

import { MultiDataSet, Label } from 'ng2-charts';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  ingresos: number = 0;
  egresos: number  = 0;
  totalIngresos: number = 0;
  totalEgresos: number  = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'egresos'];
  public doughnutChartData: MultiDataSet = [ [] ];

  private _destroyed$ = new Subject();

  constructor( private store: Store<AppStateWithIngreso>) {
  }

  ngOnInit() {
    this.store.select('ingresosEgresos')
    .pipe( takeUntil( this._destroyed$ ) )
    .subscribe( ({ items }) => this.generarEstadistica( items ) );
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  generarEstadistica( items: IngresoEgreso[] ) {

    this.totalIngresos = 0;
    this.totalEgresos = 0;
    this.ingresos = 0;
    this.egresos = 0;

    for ( const item of items ) {
          if ( item.tipo === 'ingreso' ) {
                this.totalIngresos += item.monto;
                this.ingresos ++;
          } else {
                this.totalEgresos += item.monto;
                this.egresos ++;
          }
    }

    this.doughnutChartData = [ [this.totalIngresos, this.totalEgresos] ];

  }

}
