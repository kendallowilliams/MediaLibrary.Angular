import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideIfLargerThanParentDirective } from './dom/hide-if-larger-than-parent/hide-if-larger-than-parent.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HideIfLargerThanParentDirective
  ],
  exports: [
    HideIfLargerThanParentDirective
  ],
})
export class MlUtilityModule {}
