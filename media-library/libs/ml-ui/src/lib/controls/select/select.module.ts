import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectComponent } from './select.component';
import { SelectMultiSelectDirective } from './directives/select-multiselect.directive';
import { SelectFilterDirective } from './directives/select-filter.directive';
import { SelectOptionDirective } from './directives/select-option.directive';
import { ModalModule } from '../../modal/modal.module';
import { SelectOptionComponent } from './select-option/select-option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopoverModule } from '../../popover';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ModalModule, FormsModule, ReactiveFormsModule, PopoverModule],
  declarations: [
    SelectComponent,
    SelectMultiSelectDirective,
    SelectFilterDirective,
    SelectOptionDirective,
    SelectOptionComponent
  ],
  exports: [
    SelectComponent,
    SelectMultiSelectDirective,
    SelectFilterDirective,
    SelectOptionDirective,
    SelectOptionComponent
  ],
})
export class SelectModule {}
