import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '../../interfaces/ml-data-state.inteface';
import { PlaylistService } from '../../services/playlist/playlist.service';
import { PlaylistsActions } from './playlists.actions';
import { playlists } from './playlists.data';

@Injectable()
export class PlaylistsEffects {
  private actions$ = inject(Actions);

  constructor(
    private _store: Store<MlDataFeatureState>,
    private _playlistService: PlaylistService
  ) {}

  loadPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistsActions.loadPlaylists),
      withLatestFrom(this._store.select(store => store.playlists)),
      mergeMap(([, state]) => this._playlistService.getPlaylists()
            .pipe(map(playlists => PlaylistsActions.loadPlaylistsSuccess({ playlists })))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(PlaylistsActions.loadPlaylistsFailure({ error }));
      }),
    ),
  );
}
