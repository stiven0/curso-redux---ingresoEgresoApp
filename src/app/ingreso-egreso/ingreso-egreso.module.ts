
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard.routes.module';

import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { OrdenIngresoPipe } from '../pipes/orden-ingreso.pipe';

import { StoreModule } from '@ngrx/store';
import { ingresoEgresoReducer } from './ingreso-egreso.reducer';


@NgModule({

    declarations: [
        DashboardComponent,
        IngresoEgresoComponent,
        DetalleComponent,
        EstadisticaComponent,
        OrdenIngresoPipe
    ],
    imports: [
        CommonModule,
        // cargar reducer lazy
        StoreModule.forFeature( 'ingresosEgresos', ingresoEgresoReducer ),
        RouterModule,
        ReactiveFormsModule,
        ChartsModule,
        SharedModule,
        DashboardRoutesModule
    ]

})

export class IngresoEgresoModule { }
