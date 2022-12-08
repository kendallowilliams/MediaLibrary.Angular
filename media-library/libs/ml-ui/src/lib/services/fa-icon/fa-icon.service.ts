import { Injectable } from '@angular/core';
import { fas, IconDefinition, IconName, IconPrefix } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { Icon, icon, IconParams } from '@fortawesome/fontawesome-svg-core';

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

  public getIcon(prefix: IconPrefix = 'fas', name: IconName, params?: IconParams) : Icon | undefined {
    const faIcon = this.getIconDefinition(prefix, name) || undefined;

    return faIcon ? icon(faIcon, params) : undefined;
  }
}
