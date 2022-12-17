import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark' | undefined;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkEnabled$: BehaviorSubject<boolean>;

  constructor() {
    this._darkEnabled$ = new BehaviorSubject<boolean>(this._isDark());
    this._darkEnabled$.subscribe(enabled => {
      if (enabled) {
        this._setDarkTheme();
      } else {
        this._setLightTheme();
      }
    });
    this._updateDocumentClass();
  }

  public getDarkEnabled$() : BehaviorSubject<boolean> {
    return this._darkEnabled$;
  }

  private _setLightTheme() : void {
    localStorage['theme'] = 'light';
    this._updateDocumentClass();
  }

  private _setDarkTheme() : void {
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

  private _resetTheme() : void {
    localStorage.removeItem('theme');
    this._updateDocumentClass();
  }

  public getCurrentTheme() : Theme {
    return this._isDark() ? 'dark' : localStorage['theme'];
  }
}
