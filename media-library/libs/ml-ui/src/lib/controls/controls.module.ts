import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { CheckboxDirective } from './checkbox/checkbox.directive';
import { LabelDirective } from './label/directives/label.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextBoxDirective } from './text-box/directives/text-box.directive';
import { ControlValidatorDirective } from './validation/control-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    FontAwesomeModule,
    TextBoxDirective,
    LabelDirective
  ],
  declarations: [
    CheckboxDirective,
    ControlValidatorDirective
  ],
  exports: [
    CheckboxDirective,
    LabelDirective,
    ControlValidatorDirective,
    TextBoxDirective
  ],
})
export class ControlsModule {}
