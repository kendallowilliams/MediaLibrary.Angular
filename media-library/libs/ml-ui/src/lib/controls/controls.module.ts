import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { CheckboxDirective } from './checkbox/checkbox.directive';
import { LabelDirective } from './label/directives/label.directive';
import { SearchModule } from './search/search.module';
import { SelectModule } from './select';
import { SwitchComponent } from './switch/switch.component';
import { ThemeToggleDirective } from './theme-toggle/theme-toggle.directive';
import { ListBoxComponent } from './list-box/list-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextBoxDirective } from './text-box/directives/text-box.directive';
import { ControlValidatorDirective } from './validation/control-validator.directive';
import { ListboxItemComponent } from './list-box/listbox-item/listbox-item.component';

@NgModule({
  imports: [
    CommonModule, 
    ButtonModule, 
    SearchModule, 
    SelectModule, 
    FontAwesomeModule, 
    TextBoxDirective, 
    LabelDirective],
  declarations: [
    CheckboxDirective,
    SwitchComponent,
    ThemeToggleDirective,
    ListBoxComponent,
    ControlValidatorDirective,
    ListboxItemComponent
  ],
  exports: [
    CheckboxDirective,
    LabelDirective,
    SwitchComponent,
    ThemeToggleDirective,
    ButtonModule,
    SearchModule,
    SelectModule,
    ListBoxComponent,
    ControlValidatorDirective
  ],
})
export class ControlsModule {}
