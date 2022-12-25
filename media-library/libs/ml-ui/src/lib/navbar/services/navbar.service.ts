import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _navbarNavHidden$: Subject<boolean>;

  constructor() {
    this._navbarNavHidden$ = new Subject<boolean>();
  }

  public getNavbarNavHidden$() : Subject<boolean> {
    return this._navbarNavHidden$;
  }
}
