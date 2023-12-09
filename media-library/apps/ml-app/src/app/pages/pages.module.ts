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
import { CardModule, MlUiModule } from '@media-library/ml-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MlDataModule } from '@media-library/ml-data';

export const routes: Routes = [
  { 
    path: '',
    children: [
      { path: '', component: AppHomeComponent },
      { path: 'music', component: AppMusicComponent },
      { path: 'podcast', component: AppPodcastComponent },
      { path: 'television', component: AppTelevisionComponent },
      { path: 'playlist', component: AppPlaylistComponent },
      { path: 'player', component: AppPlayerComponent },
      { path: 'search', component: AppSearchComponent },
      { path: 'settings', component: AppSettingsComponent }
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
    MlUiModule,
    FontAwesomeModule,
    CardModule,
    MlDataModule
  ],
  exports: [
    RouterModule
  ]
})
export class PagesModule { }
