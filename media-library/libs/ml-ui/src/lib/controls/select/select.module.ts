import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SelectComponent } from './select.component';
import { SelectMultiSelectDirective } from './directives/select-multiselect.directive';
import { SelectFilterDirective } from './directives/select-filter.directive';
import { SelectOptionDirective } from './directives/select-option.directive';
import { ModalModule } from '../../modal/modal.module';
import { MultiSelectOptionComponent } from './multi-select-option/multi-select-option.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ModalModule, FormsModule, ReactiveFormsModule],
  declarations: [
    SelectComponent,
    SelectMultiSelectDirective,
    SelectFilterDirective,
    SelectOptionDirective,
    MultiSelectOptionComponent
  ],
  exports: [
    SelectComponent,
    SelectMultiSelectDirective,
    SelectFilterDirective,
    SelectOptionDirective,
    MultiSelectOptionComponent
  ],
})
export class SelectModule {}
