import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';

import { AuthGuard } from '../services/auth.guard';


const rutasHijas: Routes = [

   {
        path: '',
        component: DashboardComponent,
        children: dashboardRoutes,
        // canActivate: [ AuthGuard ]
    },

];


@NgModule({
    imports: [ RouterModule.forChild( rutasHijas ) ],
    exports: [ RouterModule ]
})

export class DashboardRoutesModule { }
