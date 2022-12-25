import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateIfLargerThanParentDirective } from './dom/update-if-larger-than-parent/update-if-larger-than-parent.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    UpdateIfLargerThanParentDirective
  ],
  exports: [
    UpdateIfLargerThanParentDirective
  ],
})
export class MlUtilityModule {}
