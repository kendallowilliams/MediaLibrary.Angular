import { Directive } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[mlTheme]'
})
export class ThemeDirective {
  constructor(private _themeService: ThemeService) { }
}
