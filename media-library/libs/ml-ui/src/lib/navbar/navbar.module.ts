import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarBrandComponent } from './navbar-brand/navbar-brand.component';
import { NavbarControlsComponent } from './navbar-controls/navbar-controls.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { NavItemComponent } from './navbar-nav/nav-item/nav-item.component';
import { NavbarNavComponent } from './navbar-nav/navbar-nav.component';
import { NavbarTogglerComponent } from './navbar-toggler/navbar-toggler.component';
import { NavbarComponent } from './navbar.component';
import { NavbarIconComponent } from './navbar-controls/navbar-icon/navbar-icon.component';

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
    NavbarIconComponent
  ],
  exports: [
    NavbarComponent,
    NavbarBrandComponent,
    NavbarNavComponent,
    NavbarTogglerComponent,
    NavbarControlsComponent,
    NavbarMenuComponent,
    NavItemComponent,
    NavbarIconComponent
  ],
})
export class NavbarModule {}