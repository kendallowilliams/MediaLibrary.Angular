import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwitchComponent } from './controls/switch/switch.component';
import { CheckboxDirective } from './controls/checkbox/checkbox.directive';
import { ThemeToggleDirective } from './controls/theme-toggle/theme-toggle.directive';
import { AddIsMobileAttributeDirective } from './directives/add-is-mobile-attribute/add-is-mobile-attribute.directive';
import { HideIfNavLinksHiddenDirective } from './navbar/directives/hide-if-nav-links-hidden/hide-if-nav-links-hidden.directive';
import { ModalModule } from './modal/modal.module';
import { DropdownDirective } from './controls/dropdown/directives/dropdown.directive';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ModalModule],
  declarations: [
    SwitchComponent,
    CheckboxDirective,
    ThemeToggleDirective,
    AddIsMobileAttributeDirective,
    HideIfNavLinksHiddenDirective,
    DropdownDirective
  ],
  exports: [
    SwitchComponent,
    CheckboxDirective,
    ThemeToggleDirective,
    AddIsMobileAttributeDirective,
    HideIfNavLinksHiddenDirective,
    DropdownDirective
  ],
})
export class MlUiModule {}
