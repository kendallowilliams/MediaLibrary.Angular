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
import { ListBoxComponent } from './list-box/list-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextBoxDirective } from './textbox/directives/text-box.directive';

@NgModule({
  imports: [CommonModule, ButtonModule, SearchModule, SelectModule, FontAwesomeModule],
  declarations: [
    CheckboxDirective,
    DropdownDirective,
    LabelDirective,
    SwitchComponent,
    ThemeToggleDirective,
    ListBoxComponent,
    TextBoxDirective
  ],
  exports: [
    CheckboxDirective,
    DropdownDirective,
    LabelDirective,
    SwitchComponent,
    ThemeToggleDirective,
    ButtonModule,
    SearchModule,
    SelectModule,
    ListBoxComponent,
    TextBoxDirective
  ],
})
export class ControlsModule {}
