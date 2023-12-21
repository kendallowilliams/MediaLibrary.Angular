import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ComponentsModule } from './components/components.module';
import { AppRootVcrDirective } from '@media-library/ml-utility';
import { ErrorPagesModule, HttpErrorIntercepter } from '@media-library/ml-ui';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    PagesModule,
    RouterModule,
    AppRoutingModule,
    StoreModule.forRoot(),
    EffectsModule.forRoot(),
    ComponentsModule,
    AppRootVcrDirective,
    ErrorPagesModule
  ],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: HttpErrorIntercepter, multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
