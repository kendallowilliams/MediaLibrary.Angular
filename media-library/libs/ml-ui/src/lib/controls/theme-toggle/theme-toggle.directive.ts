import { Directive, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from '@media-library/ml-utility';
import { SwitchComponent } from '../switch/switch.component';

@Directive({
  selector: 'ml-switch[mlThemeToggle]'
})
export class ThemeToggleDirective implements OnInit {
  @HostBinding('class') private _class = `before:content-['Light'] after:content-['Dark'] after:pl-[5px] before:pr-[5px]`;

  constructor(private _host: SwitchComponent, private _themeService: ThemeService) {
    this._themeService.getDarkEnabled$().subscribe(enabled => this._host.checked = enabled);
  }

  public ngOnInit(): void {
    this._host.checkedChange.subscribe(enabled => {
      this._themeService.getDarkEnabled$().next(enabled);
    });
  }
}
