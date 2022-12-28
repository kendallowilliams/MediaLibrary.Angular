import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AutoHideNavbarLinksDirective, MlUiModule, SearchModule, UpdateIfLargerThanParentDirective } from '@media-library/ml-ui';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

@NgModule({
  declarations: [AppComponent, AppNavbarComponent],
  imports: [
    BrowserModule,
    MlUiModule,
    AppRoutingModule,
    HttpClientModule,
    SearchModule,
    UpdateIfLargerThanParentDirective,
    AutoHideNavbarLinksDirective
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
