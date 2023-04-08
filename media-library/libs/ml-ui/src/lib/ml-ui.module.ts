import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarBrandComponent } from './navbar/navbar-brand/navbar-brand.component';
import { NavbarNavComponent } from './navbar/navbar-nav/navbar-nav.component';
import { NavbarTogglerComponent } from './navbar/navbar-toggler/navbar-toggler.component';
import { NavbarControlsComponent } from './navbar/navbar-controls/navbar-controls.component';
import { NavbarMenuComponent } from './navbar/navbar-menu/navbar-menu.component';
import { NavItemComponent } from './navbar/navbar-nav/nav-item/nav-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwitchComponent } from './controls/switch/switch.component';
import { CheckboxDirective } from './controls/checkbox/checkbox.directive';
import { NavbarIconComponent } from './navbar/navbar-controls/navbar-icon/navbar-icon.component';
import { ThemeToggleDirective } from './controls/theme-toggle/theme-toggle.directive';
import { MessageBoxComponent } from './controls/message-box/message-box.component';
import { ButtonDirective } from './controls/button/button.directive';
import { AddIsMobileAttributeDirective } from './directives/add-is-mobile-attribute/add-is-mobile-attribute.directive';
import { HideIfNavLinksHiddenDirective } from './navbar/directives/hide-if-nav-links-hidden/hide-if-nav-links-hidden.directive';
import { ModalModule } from './modal/modal.module';
import { SelectComponent } from './controls/select/select.component';
import { SelectOptionComponent } from './controls/select/select-option/select-option.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, ModalModule],
  declarations: [
    NavbarComponent,
    NavbarBrandComponent,
    NavbarNavComponent,
    NavbarTogglerComponent,
    NavbarControlsComponent,
    NavbarMenuComponent,
    NavItemComponent,
    SwitchComponent,
    CheckboxDirective,
    NavbarIconComponent,
    ThemeToggleDirective,
    MessageBoxComponent,
    ButtonDirective,
    AddIsMobileAttributeDirective,
    HideIfNavLinksHiddenDirective,
    SelectComponent,
    SelectOptionComponent,
  ],
  exports: [
    NavbarComponent,
    NavbarBrandComponent,
    NavbarNavComponent,
    NavbarTogglerComponent,
    NavbarControlsComponent,
    NavbarMenuComponent,
    NavItemComponent,
    SwitchComponent,
    CheckboxDirective,
    NavbarIconComponent,
    ThemeToggleDirective,
    MessageBoxComponent,
    ButtonDirective,
    AddIsMobileAttributeDirective,
    HideIfNavLinksHiddenDirective,
    SelectComponent,
    SelectOptionComponent,
  ],
})
export class MlUiModule {}
