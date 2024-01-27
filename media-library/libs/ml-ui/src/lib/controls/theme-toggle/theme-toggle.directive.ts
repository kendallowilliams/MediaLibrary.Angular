import { DestroyRef, Directive, OnInit } from '@angular/core';
import { ThemeService } from '@media-library/ml-utility';
import { SwitchComponent } from '../switch/switch.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: 'ml-switch[mlThemeToggle]'
})
export class ThemeToggleDirective implements OnInit {
  constructor(private _host: SwitchComponent, private _themeService: ThemeService, private _destroyRef: DestroyRef) {
    this._host.offLabel = 'Light';
    this._host.onLabel = 'Dark';
    this._themeService.getDarkEnabled$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(enabled => this._host.checked = enabled);
  }

  public ngOnInit(): void {
    this._host.valueChange
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(enabled => {
        this._themeService.getDarkEnabled$().next(enabled);
      });
  }
}
