import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PodcastComponent } from './podcast/podcast.component';
import { TelevisionComponent } from './television/television.component';

export const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'music', component: MusicComponent },
    { path: 'podcast', component: PodcastComponent },
    { path: 'television', component: TelevisionComponent },
    { path: 'playlist', component: PlaylistComponent },
    { path: 'player', component: PlayerComponent }
];
