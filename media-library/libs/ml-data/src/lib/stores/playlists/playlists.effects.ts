import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '../../interfaces/ml-data-state.inteface';
import { PlaylistApiService } from '../../services/playlist/playlist-api.service';
import { PlaylistsActions } from './playlists.actions';

@Injectable()
export class PlaylistsEffects {
  private actions$ = inject(Actions);

  constructor(
    private _store: Store<MlDataFeatureState>,
    private _playlistService: PlaylistApiService
  ) {}

  loadPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistsActions.loadPlaylists),
      withLatestFrom(this._store.select(store => store.playlists)),
      mergeMap(([, state]) => {
        if (state.isCached) {
          return of(PlaylistsActions.loadPlaylistsSuccess({ playlists: state.playlists }));
        } else {
          return this._playlistService.getPlaylists()
            .pipe(map(playlists => PlaylistsActions.loadPlaylistsSuccess({ playlists })));
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(PlaylistsActions.loadPlaylistsFailure({ error }));
      }),
    ),
  );

  addSongToPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistsActions.addSongToPlaylists),
      withLatestFrom(this._store.select(store => store.playlists)),
      mergeMap(([action, state]) => {
          return this._playlistService.addSongToPlaylists(action.songId, action.playlistIds)
            .pipe(map(() => PlaylistsActions.addSongToPlaylistsSuccess()));
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(PlaylistsActions.loadPlaylistsFailure({ error }));
      }),
    ),
  );
}
