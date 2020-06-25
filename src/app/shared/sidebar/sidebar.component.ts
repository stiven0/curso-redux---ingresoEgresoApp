import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';

import { Subject } from 'rxjs';
import { takeUntil, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  private _destroyed$ = new Subject();

  constructor( private authService: AuthService,
               private router: Router,
               private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('user')
    .pipe(
      takeUntil( this._destroyed$ ),
      filter( ({user}) => user !== null )
    )
    .subscribe( ({ user }) => this.nombre = user.nombre );
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  logout() {
    this.authService.logout().then( () => {
      this.router.navigate(['/login']);
    });
  }

}
