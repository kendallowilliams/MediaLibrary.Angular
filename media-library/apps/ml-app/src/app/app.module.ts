import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MlUiModule, SearchModule } from '@media-library/ml-ui';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MlUiModule, AppRoutingModule, HttpClientModule, SearchModule],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
