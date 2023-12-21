import { createReducer, on, Action } from '@ngrx/store';
import { PodcastsActions } from './podcasts.actions';
export const PODCASTS_FEATURE_KEY = 'podcasts';

export interface PodcastsState {
  error?: string | null; // last known error (if any)
  useTestData: boolean;
}

export const initialPodcastsState: PodcastsState = {
  useTestData: true
};

const reducer = createReducer(
  initialPodcastsState,
  on(
    PodcastsActions.loadPodcastsSuccess,
    (state, { podcasts }) => ({ ...state, podcasts })
  ),
  on(PodcastsActions.loadPodcastsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function podcastsReducer(
  state: PodcastsState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
