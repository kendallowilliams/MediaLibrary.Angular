import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import { ConfigurationsActions } from './configurations.actions';
import { MusicApiService } from '../../services/music/music-api.service';
import { Store } from '@ngrx/store';
import { mediaLibraryConfiguration, musicConfiguration, playerConfiguration, playlistConfiguration, podcastConfiguration, televisionConfiguration } from './configurations.data';
import { MlDataFeatureState } from '../../interfaces/ml-data-state.inteface';
import { TelevisionApiService } from '../../services/television/television-api.service';
import { PlaylistApiService } from '../../services/playlist/playlist-api.service';
import { PodcastApiService } from '../../services/podcast/podcast-api.service';
import { AppApiService } from '../../services/app/app-api.service';
import { PlayerApiService } from '../../services/player/player-api.service';

@Injectable()
export class ConfigurationsEffects {
  private actions$ = inject(Actions);

  constructor(
    private _musicService: MusicApiService, 
    private _store: Store<MlDataFeatureState>,
    private _appService: AppApiService,
    private _televisionService: TelevisionApiService,
    private _playerService: PlayerApiService,
    private _playlistService: PlaylistApiService,
    private _podcastService: PodcastApiService
    ) {
    }

  loadMusicConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadMusicConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.loadMusicConfigurationSuccess({ configuration: musicConfiguration }));
        } else {
          return this._musicService.getConfiguration()
            .pipe(map(configuration => ConfigurationsActions.loadMusicConfigurationSuccess({ configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.loadMusicConfigurationFailure({ error }));
      }),
    ),
  );

  updateMusicConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.updateMusicConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([action, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.updateMusicConfigurationSuccess({ configuration: action.configuration }));
        } else {
          return this._musicService.updateConfiguration(action.configuration)
            .pipe(map(() => ConfigurationsActions.updateMusicConfigurationSuccess({ configuration: action.configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.updateMusicConfigurationFailure({ error }));
      }),
    ),
  );
  
  loadMediaLibraryConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadMediaLibraryConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.loadMediaLibraryConfigurationSuccess({ configuration: mediaLibraryConfiguration }));
        } else {
          return this._appService.getConfiguration()
            .pipe(map(configuration => ConfigurationsActions.loadMediaLibraryConfigurationSuccess({ configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.loadMediaLibraryConfigurationFailure({ error }));
      }),
    ),
  );

  updateMediaLibraryConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.updateMediaLibraryConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([action, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.updateMediaLibraryConfigurationSuccess({ configuration: action.configuration }));
        } else {
          return this._appService.updateConfiguration(action.configuration)
            .pipe(map(() => ConfigurationsActions.updateMediaLibraryConfigurationSuccess({ configuration: action.configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.updateMediaLibraryConfigurationFailure({ error }));
      }),
    ),
  );

  loadTelevisionConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadTelevisionConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.loadTelevisionConfigurationSuccess({ configuration: televisionConfiguration }));
        } else {
          return this._televisionService.getConfiguration()
            .pipe(map(configuration => ConfigurationsActions.loadTelevisionConfigurationSuccess({ configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.loadTelevisionConfigurationFailure({ error }));
      }),
    ),
  );

  updateTelevisionConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.updateTelevisionConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([action, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.updateTelevisionConfigurationSuccess({ configuration: action.configuration }));
        } else {
          return this._televisionService.updateConfiguration(action.configuration)
            .pipe(map(() => ConfigurationsActions.updateTelevisionConfigurationSuccess({ configuration: action.configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.updateTelevisionConfigurationFailure({ error }));
      }),
    ),
  );

  loadPodcastConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadPodcastConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.loadPodcastConfigurationSuccess({ configuration: podcastConfiguration }));
        } else {
          return this._podcastService.getConfiguration()
            .pipe(map(configuration => ConfigurationsActions.loadPodcastConfigurationSuccess({ configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.loadPodcastConfigurationFailure({ error }));
      }),
    ),
  );

  updatePodcastConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.updatePodcastConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([action, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.updatePodcastConfigurationSuccess({ configuration: action.configuration }));
        } else {
          return this._podcastService.updateConfiguration(action.configuration)
            .pipe(map(() => ConfigurationsActions.updatePodcastConfigurationSuccess({ configuration: action.configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.updatePodcastConfigurationFailure({ error }));
      }),
    ),
  );

  loadPlayerConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadPlayerConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.loadPlayerConfigurationSuccess({ configuration: playerConfiguration }));
        } else {
          return this._playerService.getConfiguration()
            .pipe(map(configuration => ConfigurationsActions.loadPlayerConfigurationSuccess({ configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.loadPlayerConfigurationFailure({ error }));
      }),
    ),
  );

  updatePlayerConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.updatePlayerConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([action, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.updatePlayerConfigurationSuccess({ configuration: action.configuration }));
        } else {
          return this._playerService.updateConfiguration(action.configuration)
            .pipe(map(() => ConfigurationsActions.updatePlayerConfigurationSuccess({ configuration: action.configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.updatePlayerConfigurationFailure({ error }));
      }),
    ),
  );

  loadPlaylistConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadPlaylistConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.loadPlaylistConfigurationSuccess({ configuration: playlistConfiguration }));
        } else {
          return this._playlistService.getConfiguration()
            .pipe(map(configuration => ConfigurationsActions.loadPlaylistConfigurationSuccess({ configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.loadPlaylistConfigurationFailure({ error }));
      }),
    ),
  );

  updatePlaylistConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.updatePlaylistConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([action, state]) => {
        if (state.useTestData) {
          return of(ConfigurationsActions.updatePlaylistConfigurationSuccess({ configuration: action.configuration }));
        } else {
          return this._playlistService.updateConfiguration(action.configuration)
            .pipe(map(() => ConfigurationsActions.updatePlaylistConfigurationSuccess({ configuration: action.configuration })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.updatePlaylistConfigurationFailure({ error }));
      }),
    ),
  );
}
