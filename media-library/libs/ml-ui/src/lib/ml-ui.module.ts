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

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    NavbarComponent,
    NavbarBrandComponent,
    NavbarNavComponent,
    NavbarTogglerComponent,
    NavbarControlsComponent,
    NavbarMenuComponent,
    NavItemComponent,
    SwitchComponent,
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
  ],
})
export class MlUiModule {}
