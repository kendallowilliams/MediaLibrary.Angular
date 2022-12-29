import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private _navbarNavHidden$: Subject<boolean>;
  private _navbarMenuOpen$: BehaviorSubject<boolean>;

  constructor() {
    this._navbarNavHidden$ = new Subject<boolean>();
    this._navbarMenuOpen$ = new BehaviorSubject<boolean>(false);
  }

  public getNavbarNavHidden$() : Subject<boolean> {
    return this._navbarNavHidden$;
  }

  public getNavbarMenuOpen$() : BehaviorSubject<boolean> {
    return this._navbarMenuOpen$;
  }
}
