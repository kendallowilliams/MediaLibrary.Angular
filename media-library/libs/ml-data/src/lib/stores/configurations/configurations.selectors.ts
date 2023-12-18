import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONFIGURATIONS_FEATURE_KEY, ConfigurationsState,
} from './configurations.reducer';

// Lookup the 'Configurations' feature state managed by NgRx
export const selectConfigurationsState =
  createFeatureSelector<ConfigurationsState>(CONFIGURATIONS_FEATURE_KEY);

export const selectMusicConfiguration = createSelector(
  selectConfigurationsState,
  (state: ConfigurationsState) => state.musicConfiguration
);
