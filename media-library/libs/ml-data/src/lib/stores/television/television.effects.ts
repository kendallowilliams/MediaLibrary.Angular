import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, withLatestFrom, mergeMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '../../interfaces/ml-data-state.inteface';
import { TelevisionApiService } from '../../services/television/television-api.service';
import { series } from './television.data';
import { TelevisionActions } from './television.actions';

@Injectable()
export class TelevisionEffects {
  private actions$ = inject(Actions);

  constructor(
    private _store: Store<MlDataFeatureState>,
    private _televisionService: TelevisionApiService,
    ) {}

  loadTelevision$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TelevisionActions.loadSeries),
      withLatestFrom(this._store.select(store => store.television)),
      mergeMap(([, state]) => {
        if (state.useTestData) {
          return of(TelevisionActions.loadSeriesSuccess({ series }));
        } else {
          return this._televisionService.getSeries()
            .pipe(map(series => TelevisionActions.loadSeriesSuccess({ series })))
        }
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(TelevisionActions.loadSeriesFailure({ error }));
      }),
    ),
  );
}
