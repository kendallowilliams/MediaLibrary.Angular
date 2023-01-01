import { Routes } from "@angular/router"
import { PageNotFoundComponent } from "@media-library/ml-ui";
import { AppHomeComponent } from "./app-home/app-home.component";
import { AppMusicComponent } from "./app-music/app-music.component";
import { AppPlayerComponent } from "./app-player/app-player.component";
import { AppPlaylistComponent } from "./app-playlist/app-playlist.component";
import { AppPodcastComponent } from "./app-podcast/app-podcast.component";
import { AppSearchComponent } from "./app-search/app-search.component";
import { AppSettingsComponent } from "./app-settings/app-settings.component";
import { AppTelevisionComponent } from "./app-television/app-television.component";


export const routes: Routes = [
  { path: 'home', component: AppHomeComponent },
  { path: 'music', component: AppMusicComponent },
  { path: 'podcast', component: AppPodcastComponent },
  { path: 'television', component: AppTelevisionComponent },
  { path: 'playlist', component: AppPlaylistComponent },
  { path: 'player', component: AppPlayerComponent },
  { path: 'search', component: AppSearchComponent },
  { path: 'settings', component: AppSettingsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];