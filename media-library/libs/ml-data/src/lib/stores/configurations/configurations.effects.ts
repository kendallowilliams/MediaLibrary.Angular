import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import { ConfigurationsActions } from './configurations.actions';
import { MusicService } from '../../services/music/music.service';

@Injectable()
export class ConfigurationsEffects {
  private actions$ = inject(Actions);

  constructor(private _musicService: MusicService) {}

  loadMusicConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.loadMusicConfiguration),
      switchMap(() =>
        this._musicService.getConfiguration()
          .pipe(map(configuration => ConfigurationsActions.loadMusicConfigurationSuccess({ configuration })))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.loadMusicConfigurationFailure({ error }));
      }),
    ),
  );

  updateMusicConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigurationsActions.updateMusicConfiguration),
      switchMap((action) =>
        this._musicService.updateConfiguration(action.configuration)
          .pipe(map(() => ConfigurationsActions.updateMusicConfigurationSuccess({ configuration: action.configuration })))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(ConfigurationsActions.updateMusicConfigurationFailure({ error }));
      }),
    ),
  );
}
