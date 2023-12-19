import { createReducer, on, Action } from '@ngrx/store';

import { ConfigurationsActions } from './configurations.actions';
import { MusicConfiguration } from '../../models/configurations/MusicConfiguration.interface';
import { MediaLibraryConfiguration } from '../../models/configurations/MediaLibraryConfiguration.interface';
import { PodcastConfiguration } from '../../models/configurations/PodcastConfiguration.interface';
import { PlayerConfiguration } from '../../models/configurations/PlayerConfiguration.interface';
import { PlaylistConfiguration } from '../../models/configurations/PlaylistConfiguration.interface';
import { TelevisionConfiguration } from '../../models/configurations/TelevisionConfiguration.interface';

export const CONFIGURATIONS_FEATURE_KEY = 'configurations';

export interface ConfigurationsState {
  musicConfiguration?: MusicConfiguration;
  mediaLibraryConfiguration?: MediaLibraryConfiguration;
  podcastConfiguration?: PodcastConfiguration;
  playerConfiguration?: PlayerConfiguration;
  televisionConfiguration?: TelevisionConfiguration;
  playlistConfiguration?: PlaylistConfiguration;
  error?: string | null; // last known error (if any)
  useTestData: boolean;
}

export const initialConfigurationsState: ConfigurationsState = {
  useTestData: true
};

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
    ConfigurationsActions.updateMusicConfigurationSuccess, (state, { configuration }) =>
      ({ ...state, musicConfiguration: configuration })
  ),
  on(ConfigurationsActions.updateMusicConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.loadPodcastConfigurationSuccess,
    (state, { configuration }) => ({ ...state, podcastConfiguration: configuration })
  ),
  on(ConfigurationsActions.loadPodcastConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.updatePodcastConfigurationSuccess, (state, { configuration }) =>
      ({ ...state, podcastConfiguration: configuration })
  ),
  on(ConfigurationsActions.updatePodcastConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.loadMediaLibraryConfigurationSuccess,
    (state, { configuration }) => ({ ...state, mediaLibraryConfiguration: configuration })
  ),
  on(ConfigurationsActions.loadMediaLibraryConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.updateMediaLibraryConfigurationSuccess, (state, { configuration }) =>
      ({ ...state, mediaLibraryConfiguration: configuration })
  ),
  on(ConfigurationsActions.updateMediaLibraryConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.loadPlayerConfigurationSuccess,
    (state, { configuration }) => ({ ...state, playerConfiguration: configuration })
  ),
  on(ConfigurationsActions.loadPlayerConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.updatePlayerConfigurationSuccess, (state, { configuration }) =>
      ({ ...state, playerConfiguration: configuration })
  ),
  on(ConfigurationsActions.updatePlayerConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.loadPlaylistConfigurationSuccess,
    (state, { configuration }) => ({ ...state, playlistConfiguration: configuration })
  ),
  on(ConfigurationsActions.loadPlaylistConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.updatePlaylistConfigurationSuccess, (state, { configuration }) =>
      ({ ...state, playlistConfiguration: configuration })
  ),
  on(ConfigurationsActions.updatePlaylistConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.loadTelevisionConfigurationSuccess,
    (state, { configuration }) => ({ ...state, televisionConfiguration: configuration })
  ),
  on(ConfigurationsActions.loadTelevisionConfigurationFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    ConfigurationsActions.updateTelevisionConfigurationSuccess, (state, { configuration }) =>
      ({ ...state, televsionConfiguration: configuration })
  ),
  on(ConfigurationsActions.updateTelevisionConfigurationFailure, (state, { error }) => ({
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
