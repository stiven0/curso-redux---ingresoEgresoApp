import { Component, OnInit, OnDestroy } from '@angular/core';

import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as actionsINGRESOSEGRESOS from '../ingreso-egreso/ingreso-egreso.actions';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject();

  constructor( private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.store.select('user')
    .pipe(
      takeUntil( this._destroyed$ ),
      filter( auth => auth.user != null )
    )
    .subscribe( ({ user }) =>  {
      console.log(user);

      this.ingresoEgresoService.initIngresosEgresosListener( user.uid )
          .pipe( takeUntil(this._destroyed$) )
          .subscribe( ingresosEgresosFB => {

            this.store.dispatch( actionsINGRESOSEGRESOS.setItems( { items: ingresosEgresosFB } ) );

          });
    });
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

}
