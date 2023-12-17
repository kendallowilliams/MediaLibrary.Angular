import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './directives/theme.directive';
import { AppRootVcrDirective } from './directives/app-root-vcr.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemeDirective, AppRootVcrDirective],
  exports: [ThemeDirective, AppRootVcrDirective]
})
export class MlUtilityModule {}
