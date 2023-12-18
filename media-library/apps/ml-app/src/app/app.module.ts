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
import { MlUtilityModule } from '@media-library/ml-utility';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

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
    NavbarModule,
    MlUtilityModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
