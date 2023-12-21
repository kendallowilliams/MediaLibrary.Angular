import { createFeatureSelector } from '@ngrx/store';
import {
  PODCASTS_FEATURE_KEY, PodcastsState,
} from './podcasts.reducer';

// Lookup the 'Podcasts' feature state managed by NgRx
export const selectPodcastsState =
  createFeatureSelector<PodcastsState>(PODCASTS_FEATURE_KEY);
