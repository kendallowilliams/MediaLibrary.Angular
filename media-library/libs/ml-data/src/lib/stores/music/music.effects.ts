import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import { MusicApiService } from '../../services/music/music-api.service';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '../../interfaces/ml-data-state.inteface';
import { MusicActions } from './music.actions';

@Injectable()
export class MusicEffects {
  private actions$ = inject(Actions);

  constructor(
    private _musicService: MusicApiService, 
    private _store: Store<MlDataFeatureState>
  ) {}

  loadAlbums$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.loadAlbums),
      withLatestFrom(this._store.select(store => store.music)),
      mergeMap(([, state]) => this._musicService.getAlbums()
        .pipe(map(albums => MusicActions.loadAlbumsSuccess({ albums })
      ))),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.loadAlbumsFailure({ error }));
      }),
    ),
  );

  loadArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.loadAlbums),
      withLatestFrom(this._store.select(store => store.music)),
      mergeMap(([, state]) => this._musicService.getArtists()
        .pipe(map(artists => MusicActions.loadArtistsSuccess({ artists })
      ))),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.loadArtistsFailure({ error }));
      }),
    ),
  );

  loadTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.loadTracks),
      withLatestFrom(this._store.select(store => store.music)),
      mergeMap(([, state]) => this._musicService.getTracks()
        .pipe(map(tracks => MusicActions.loadTracksSuccess({ tracks })
      ))),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.loadTracksFailure({ error }));
      }),
    ),
  );

  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.loadGenres),
      withLatestFrom(this._store.select(store => store.music)),
      mergeMap(([, state]) => this._musicService.getGenres()
        .pipe(map(genres => MusicActions.loadGenresSuccess({ genres })
      ))),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.loadGenresFailure({ error }));
      }),
    ),
  );

  updateTrack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.updateTrack),
      withLatestFrom(this._store.select(store => store.music)),
      mergeMap(([action, state]) => this._musicService.updateTrack(action.track)
        .pipe(map(track => MusicActions.updateTrackSuccess({ track })
      ))),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.loadGenresFailure({ error }));
      }),
    ),
  );
}
