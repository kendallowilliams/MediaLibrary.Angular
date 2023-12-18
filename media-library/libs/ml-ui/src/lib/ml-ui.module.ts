import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddIsMobileAttributeDirective } from './directives/add-is-mobile-attribute/add-is-mobile-attribute.directive';
import { HideIfNavLinksHiddenDirective } from './navbar/directives/hide-if-nav-links-hidden/hide-if-nav-links-hidden.directive';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    AddIsMobileAttributeDirective,
    HideIfNavLinksHiddenDirective
  ],
  exports: [
    AddIsMobileAttributeDirective,
    HideIfNavLinksHiddenDirective
  ],
})
export class MlUiModule {}
