import { DestroyRef, Directive, OnInit } from '@angular/core';
import { ThemeService } from '@media-library/ml-utility';
import { SwitchComponent } from '../switch.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: 'ml-switch[mlThemeToggle]',
  standalone: true
})
export class ThemeToggleDirective implements OnInit {
  constructor(private _host: SwitchComponent, private _themeService: ThemeService, private _destroyRef: DestroyRef) {
    this._host.offLabel = 'Light';
    this._host.onLabel = 'Dark';
    this._themeService.getDarkEnabled$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(isEnabled => this._host.checked = isEnabled);
  }

  public ngOnInit(): void {
    this._host.registerOnChange(isChecked => this._themeService.getDarkEnabled$().next(isChecked));
  }
}
