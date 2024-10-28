import { NgModule } from "@angular/core";
import { AutoHideNavbarLinksDirective, NavbarModule, SearchModule, SwitchModule } from "@media-library/ml-ui";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MlUtilityModule } from "@media-library/ml-utility";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NavbarModule,
    MlUtilityModule,
    AutoHideNavbarLinksDirective,
    RouterModule,
    SwitchModule,
    SearchModule
  ],
  exports: [
    AppNavbarComponent
  ],
  declarations: [
    AppNavbarComponent
  ]
})
export class AppComponentsModule {
}