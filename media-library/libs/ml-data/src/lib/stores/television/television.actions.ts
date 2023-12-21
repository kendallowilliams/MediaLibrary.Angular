import { createAction, props } from '@ngrx/store';
import { Series } from '../../models/television/Series.model';

export class TelevisionActions {
  public static loadSeries = createAction('[Television/API] Load Series');
  public static loadSeriesSuccess = createAction(
    '[Television/API] Load Series Success',
    props<{ series: Series[] }>(),
  );
  public static loadSeriesFailure = createAction(
    '[Television/API] Load Series Failure',
    props<{ error: string }>(),
  );
}

