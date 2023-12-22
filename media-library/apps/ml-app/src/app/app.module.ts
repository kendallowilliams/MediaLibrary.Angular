import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponentsModule } from './components/app-components.module';
import { AppRootVcrDirective } from '@media-library/ml-utility';
import { ErrorPagesModule, HttpErrorIntercepter } from '@media-library/ml-ui';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_ENVIRONMENT } from '@media-library/ml-data';
import { environment } from '../environments/environment';

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
    AppComponentsModule,
    AppRootVcrDirective,
    ErrorPagesModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorIntercepter, multi: true },
    { provide: APP_ENVIRONMENT, useValue: environment }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
