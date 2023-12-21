import { createReducer, on, Action } from '@ngrx/store';
import { TelevisionActions } from './television.actions';
import { Series } from '../../models/television/Series.model';
export const TELEVISION_FEATURE_KEY = 'television';

export interface TelevisionState {
  series: Series[];
  error?: string | null; // last known error (if any)
  useTestData: boolean;
}

export const initialTelevisionState: TelevisionState = {
  series: [],
  useTestData: true
};

const reducer = createReducer(
  initialTelevisionState,
  on(
    TelevisionActions.loadSeriesSuccess,
    (state, { series }) => ({ ...state, series })
  ),
  on(TelevisionActions.loadSeriesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function televisionReducer(
  state: TelevisionState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
