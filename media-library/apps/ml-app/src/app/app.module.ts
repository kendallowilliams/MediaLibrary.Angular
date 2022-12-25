import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MlUiModule, SearchModule } from '@media-library/ml-ui';
import { MlUtilityModule } from '@media-library/ml-utility';

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
    MlUtilityModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
