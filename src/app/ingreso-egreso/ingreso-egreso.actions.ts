import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso';

export const setItems   =   createAction(
    '[IngresoEgreso] Set Items',
    props<{ items: IngresoEgreso[] }>()
);

export const unSetItems =   createAction('[unSetItems]    Unset Items');
