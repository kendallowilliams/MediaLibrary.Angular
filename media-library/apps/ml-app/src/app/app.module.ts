import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  AutoHideNavbarLinksDirective,
  CardModule,
  MlUiModule,
  ModalModule,
  SearchModule,
  UpdateIfLargerThanParentDirective,
} from '@media-library/ml-ui';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppMusicComponent } from './app-music/app-music.component';
import { AppPlaylistComponent } from './app-playlist/app-playlist.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { AppPodcastComponent } from './app-podcast/app-podcast.component';
import { AppSearchComponent } from './app-search/app-search.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AppTelevisionComponent } from './app-television/app-television.component';
import { AppAlbumComponent } from './app-music/app-album/app-album.component';
import { AppArtistComponent } from './app-music/app-artist/app-artist.component';
import { AppTrackComponent } from './app-music/app-track/app-track.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    AppHomeComponent,
    AppMusicComponent,
    AppPlaylistComponent,
    AppPlayerComponent,
    AppPodcastComponent,
    AppSearchComponent,
    AppSettingsComponent,
    AppTelevisionComponent,
    AppAlbumComponent,
    AppArtistComponent,
    AppTrackComponent,
  ],
  imports: [
    BrowserModule,
    MlUiModule,
    AppRoutingModule,
    HttpClientModule,
    SearchModule,
    UpdateIfLargerThanParentDirective,
    AutoHideNavbarLinksDirective,
    CardModule,
    ModalModule,
    FontAwesomeModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
