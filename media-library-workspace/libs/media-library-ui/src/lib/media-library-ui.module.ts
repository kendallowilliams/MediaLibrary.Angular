import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MusicComponent } from './music/music.component';
import { PlayerComponent } from './player/player.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { TelevisionComponent } from './television/television.component';
import { PodcastComponent } from './podcast/podcast.component';
import { NavBarComponent } from './controls/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { NavBarLinksComponent } from './controls/nav-bar/nav-bar-links/nav-bar-links.component';
import { NavBarLinkComponent } from './controls/nav-bar/nav-bar-link/nav-bar-link.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  declarations: [
    HomeComponent,
    MusicComponent,
    PlayerComponent,
    PlaylistComponent,
    TelevisionComponent,
    PodcastComponent,
    NavBarComponent,
    NavBarLinksComponent,
    NavBarLinkComponent,
  ],
  exports: [
    HomeComponent,
    MusicComponent,
    PlayerComponent,
    PlaylistComponent,
    TelevisionComponent,
    PodcastComponent,
    NavBarComponent,
    RouterModule,
    NavBarLinksComponent,
    NavBarLinkComponent,
  ],
})
export class MediaLibraryUiModule {}
