import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { CheckboxDirective } from './checkbox/checkbox.directive';
import { DropdownDirective } from './dropdown/directives/dropdown.directive';
import { LabelDirective } from './label/directives/label.directive';
import { SearchModule } from './search/search.module';
import { SelectModule } from './select';
import { SwitchComponent } from './switch/switch.component';
import { ThemeToggleDirective } from './theme-toggle/theme-toggle.directive';

@NgModule({
  imports: [CommonModule, ButtonModule, SearchModule, SelectModule],
  declarations: [
    CheckboxDirective,
    DropdownDirective,
    LabelDirective,
    SwitchComponent,
    ThemeToggleDirective
  ],
  exports: [
    CheckboxDirective,
    DropdownDirective,
    LabelDirective,
    SwitchComponent,
    ThemeToggleDirective,
    ButtonModule,
    SearchModule,
    SelectModule
  ],
})
export class ControlsModule {}
