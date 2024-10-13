import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './directives/theme.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemeDirective],
  exports: [ThemeDirective]
})
export class MlUtilityModule {}
