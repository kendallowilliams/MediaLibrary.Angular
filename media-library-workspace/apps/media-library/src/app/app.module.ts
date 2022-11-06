import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MediaLibraryUiModule } from '@media-library-workspace/media-library-ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    MediaLibraryUiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
