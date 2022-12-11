import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements OnDestroy {
  private _loading$: Subject<boolean>;

  constructor() { 
    this._loading$ = new Subject<boolean>();
  }
  
  public ngOnDestroy(): void {
    this._loading$.unsubscribe();
  }

  public getLoading$() : Subject<boolean> {
    return this._loading$;
  }
}
