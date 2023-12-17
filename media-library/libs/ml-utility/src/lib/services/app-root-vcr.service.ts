import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppRootVcrService {
  private _vcr?: ViewContainerRef;

  public set vcr(vcr: ViewContainerRef) {
    this._vcr = vcr;
  }

  public get vcr(): ViewContainerRef | undefined {
    return this._vcr;
  }
}
