import { NgModule } from "@angular/core";
import { AutoHideNavbarLinksDirective, ControlsModule, NavbarModule } from "@media-library/ml-ui";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MlUtilityModule } from "@media-library/ml-utility";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    FontAwesomeModule,
    NavbarModule,
    MlUtilityModule,
    AutoHideNavbarLinksDirective,
    RouterModule
  ],
  exports: [],
  declarations: [AppNavbarComponent]
})
export class ComponentsModule {
}