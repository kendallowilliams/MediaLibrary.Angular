import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSongComponent } from './app-music/app-song/app-song.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { AppAlbumComponent } from './app-music/app-album/app-album.component';
import { AppArtistComponent } from './app-music/app-artist/app-artist.component';
import { AppMusicComponent } from './app-music/app-music.component';
import { AppPlayerComponent } from './app-player/app-player.component';
import { AppPlaylistComponent } from './app-playlist/app-playlist.component';
import { AppPodcastComponent } from './app-podcast/app-podcast.component';
import { AppSearchComponent } from './app-search/app-search.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { AppTelevisionComponent } from './app-television/app-television.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationModule, ControlsModule } from '@media-library/ml-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MlDataModule, API_BASE_URL } from '@media-library/ml-data';
import { environment } from '../../environments/environment';

export const routes: Routes = [
  { 
    path: '',
    children: [
      { path: '', component: AppHomeComponent },
      { path: 'music', title:'Music', component: AppMusicComponent },
      { path: 'podcast', title:'Podcast', component: AppPodcastComponent },
      { path: 'television', title:'Television', component: AppTelevisionComponent },
      { path: 'playlist', title:'Playlist', component: AppPlaylistComponent },
      { path: 'player', title:'Player', component: AppPlayerComponent },
      { path: 'search', title:'Search', component: AppSearchComponent },
      { path: 'settings', title:'Settings', component: AppSettingsComponent }
    ]
   }
];

@NgModule({
  declarations: [
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
    AppSongComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    MlDataModule,
    ConfigurationModule,
    ControlsModule
  ],
  exports: [
    RouterModule
  ],
  providers: [{ provide: API_BASE_URL, useValue: environment.apiBaseUrl }]
})
export class PagesModule { }
