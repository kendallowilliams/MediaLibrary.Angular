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
import { SelectSearchDirective } from './directives/select-search.directive';
import { SelectSearchTemplateDirective } from './directives/select-search-template.directive';
import { TextBoxDirective } from '../text-box/directives/text-box.directive';
import { SelectSearchComponent } from './select-search/select-search.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ModalModule, FormsModule, ReactiveFormsModule, PopoverModule, TextBoxDirective],
  declarations: [
    SelectComponent,
    SelectMultiSelectDirective,
    SelectFilterDirective,
    SelectOptionDirective,
    SelectOptionComponent,
    SelectSearchDirective,
    SelectSearchTemplateDirective,
    SelectSearchComponent
  ],
  exports: [
    SelectComponent,
    SelectMultiSelectDirective,
    SelectFilterDirective,
    SelectOptionDirective,
    SelectOptionComponent,
    SelectSearchDirective
  ],
})
export class SelectModule {}
