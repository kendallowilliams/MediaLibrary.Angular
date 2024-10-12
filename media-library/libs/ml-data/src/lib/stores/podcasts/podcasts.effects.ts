import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '../../interfaces/ml-data-state.inteface';
import { PodcastApiService } from '../../services/podcast/podcast-api.service';
import { PodcastsActions } from './podcasts.actions';
import { podcasts } from './podcasts.data';

@Injectable()
export class PodcastsEffects {
  private actions$ = inject(Actions);

  constructor(
    private _store: Store<MlDataFeatureState>,
    private _podcastService: PodcastApiService
  ) {}

  loadMusicConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodcastsActions.loadPodcasts),
      withLatestFrom(this._store.select(store => store.podcasts)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(PodcastsActions.loadPodcastsSuccess({ podcasts }));
        } else {
          return this._podcastService.getPodcasts()
            .pipe(map(podcasts => PodcastsActions.loadPodcastsSuccess({ podcasts })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(PodcastsActions.loadPodcastsFailure({ error }));
      }),
    ),
  );
}
