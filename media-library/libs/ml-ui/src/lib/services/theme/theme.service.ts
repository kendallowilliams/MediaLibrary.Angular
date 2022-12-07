import { Injectable } from '@angular/core';

export type Theme = 'light' | 'dark' | undefined;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
    this._updateDocumentClass();
  }

  public setLightTheme() : void {
    localStorage['theme'] = 'light';
    this._updateDocumentClass();
  }

  public setDarkTheme() : void {
    localStorage['theme'] = 'dark';
    this._updateDocumentClass();
  }

  private _updateDocumentClass() : void {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (this._isDark()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  private _isDark() : boolean {
    return localStorage['theme'] === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }

  public resetTheme() : void {
    localStorage.removeItem('theme');
    this._updateDocumentClass();
  }

  public getCurrentTheme() : Theme {
    return this._isDark() ? 'dark' : localStorage['theme'];
  }
}
