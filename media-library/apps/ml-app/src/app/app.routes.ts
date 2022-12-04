import { Routes } from "@angular/router"
import { 
  HomeComponent, MusicComponent, PlayerComponent, 
  PlaylistComponent, PodcastComponent, TelevisionComponent, 
  PageNotFoundComponent } from "@media-library/ml-ui";


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'music', component: MusicComponent },
  { path: 'podcast', component: PodcastComponent },
  { path: 'television', component: TelevisionComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: 'player', component: PlayerComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];