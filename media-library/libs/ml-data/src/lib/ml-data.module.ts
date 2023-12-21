import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CONFIGURATIONS_FEATURE_KEY, configurationsReducer} from './stores/configurations/configurations.reducer';
import { ConfigurationsEffects } from './stores/configurations/configurations.effects';
import { MusicEffects } from './stores/music/music.effects';
import { PlaylistsEffects } from './stores/playlists/playlists.effects';
import { PodcastsEffects } from './stores/podcasts/podcasts.effects';
import { TelevisionEffects } from './stores/television/television.effects';
import { MUSIC_FEATURE_KEY, musicReducer } from './stores/music/music.reducer';
import { PODCASTS_FEATURE_KEY, podcastsReducer } from './stores/podcasts/podcasts.reducer';
import { PLAYLISTS_FEATURE_KEY, playlistsReducer } from './stores/playlists/playlists.reducer';
import { TELEVISION_FEATURE_KEY, televisionReducer } from './stores/television/television.reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(CONFIGURATIONS_FEATURE_KEY, configurationsReducer),
    StoreModule.forFeature(MUSIC_FEATURE_KEY, musicReducer),
    StoreModule.forFeature(PLAYLISTS_FEATURE_KEY, playlistsReducer),
    StoreModule.forFeature(PODCASTS_FEATURE_KEY, podcastsReducer),
    StoreModule.forFeature(TELEVISION_FEATURE_KEY, televisionReducer),
    EffectsModule.forFeature([ConfigurationsEffects, MusicEffects, PlaylistsEffects, PodcastsEffects, TelevisionEffects]),
  ],
})
export class MlDataModule {}
