import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { AppMusicPageComponent } from './app-music-page/app-music-page.component';
import { AppPlayerPageComponent } from './app-player-page/app-player-page.component';
import { AppPlaylistPageComponent } from './app-playlist-page/app-playlist-page.component';
import { AppPodcastPageComponent } from './app-podcast-page/app-podcast-page.component';
import { AppSearchPageComponent } from './app-search-page/app-search-page.component';
import { AppSettingsPageComponent } from './app-settings-page/app-settings-page.component';
import { AppTelevisionPageComponent } from './app-television-page/app-television-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationModule, ControlsModule, TabModule } from '@media-library/ml-ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MlDataModule, API_BASE_URL } from '@media-library/ml-data';
import { environment } from '../../environments/environment';
import { AppComponentsModule } from '../components/app-components.module';

export const routes: Routes = [
  { 
    path: '',
    children: [
      { path: '', component: AppHomePageComponent },
      { path: 'music', title:'Music', component: AppMusicPageComponent },
      { path: 'podcast', title:'Podcast', component: AppPodcastPageComponent },
      { path: 'television', title:'Television', component: AppTelevisionPageComponent },
      { path: 'playlist', title:'Playlist', component: AppPlaylistPageComponent },
      { path: 'player', title:'Player', component: AppPlayerPageComponent },
      { path: 'search', title:'Search', component: AppSearchPageComponent },
      { path: 'settings', title:'Settings', component: AppSettingsPageComponent }
    ]
   }
];

@NgModule({
  declarations: [
    AppHomePageComponent,
    AppMusicPageComponent,
    AppPlaylistPageComponent,
    AppPlayerPageComponent,
    AppSearchPageComponent,
    AppSettingsPageComponent,
    AppTelevisionPageComponent,
    AppPodcastPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    MlDataModule,
    ConfigurationModule,
    ControlsModule,
    AppComponentsModule,
    TabModule
  ],
  exports: [
    RouterModule
  ],
  providers: [{ provide: API_BASE_URL, useValue: environment.apiBaseUrl }]
})
export class PagesModule { }
