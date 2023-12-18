import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import { ConfigurationsActions } from './configurations.actions';
import { MusicService } from '../../services/music/music.service';
import { Store } from '@ngrx/store';
import { musicConfiguration } from './configurations.data';
import { MlDataFeatureState } from '../../interfaces/ml-data-state.inteface';

@Injectable()
export class ConfigurationsEffects {
  private actions$ = inject(Actions);

  constructor(private _musicService: MusicService, private _store: Store<MlDataFeatureState>) {}

  loadMusicConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadMusicConfiguration),
      withLatestFrom(this._store.select(store => store.configurations)),
      mergeMap(([action, state]) => {
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
}
