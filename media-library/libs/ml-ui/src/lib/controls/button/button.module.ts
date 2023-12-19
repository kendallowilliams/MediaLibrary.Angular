import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from './directives/button.directive';
import { SecondaryButtonDirective } from './directives/secondary-button.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonDirective,
    SecondaryButtonDirective
  ],
  exports: [
    ButtonDirective,
    SecondaryButtonDirective
  ],
})
export class ButtonModule {}
