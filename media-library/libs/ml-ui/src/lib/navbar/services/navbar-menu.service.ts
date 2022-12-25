import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarMenuService {
  private _menuOpen$: Subject<boolean>;

  constructor() {
    this._menuOpen$ = new Subject<boolean>();
  }

  public getMenuOpen$(): Subject<boolean> {
    return this._menuOpen$;
  }
}
