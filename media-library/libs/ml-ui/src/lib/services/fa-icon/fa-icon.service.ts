import { Injectable } from '@angular/core';
import { fas, IconDefinition, IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Injectable({
  providedIn: 'root'
})
export class FaIconService {

  constructor(private _faIconLibrary: FaIconLibrary) { 
    this._faIconLibrary.addIconPacks(fas);
  }

  public getIconDefinition(prefix: IconPrefix = 'fas', name: IconName) : IconDefinition | undefined {
    return this._faIconLibrary.getIconDefinition(prefix, name) || undefined;
  }
}
