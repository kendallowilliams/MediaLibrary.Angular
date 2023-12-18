import { createReducer, on, Action } from '@ngrx/store';

import { ConfigurationsActions } from './configurations.actions';
import { MusicConfiguration } from '../../models/configurations/MusicConfiguration.interface';

export const CONFIGURATIONS_FEATURE_KEY = 'configurations';

export interface ConfigurationsState {
  musicConfiguration?: MusicConfiguration; // which Configurations record has been selected
  error?: string | null; // last known error (if any)
}

export interface ConfigurationsPartialState {
  readonly [CONFIGURATIONS_FEATURE_KEY]: ConfigurationsState;
}

export const initialConfigurationsState: ConfigurationsState = {};

const reducer = createReducer(
  initialConfigurationsState,
  on(
    ConfigurationsActions.loadMusicConfigurationSuccess,
    (state, { configuration }) => ({ ...state, musicConfiguration: configuration })
  ),
  on(ConfigurationsActions.loadMusicConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.updateMusicConfigurationSuccess,
    (state, { configuration }) => ({ ...state, musicConfiguration: configuration })
  ),
  on(ConfigurationsActions.updateMusicConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function configurationsReducer(
  state: ConfigurationsState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
