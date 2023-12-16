import { NgModule } from '@angular/core';
import {
  AutoHideNavbarLinksDirective,
  MlUiModule,
  NavbarModule,
  SearchModule
} from '@media-library/ml-ui';
import { AppComponent } from './app.component';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PagesModule,
    RouterModule,
    MlUiModule,
    SearchModule,
    AutoHideNavbarLinksDirective,
    AppRoutingModule,
    FontAwesomeModule,
    NavbarModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
