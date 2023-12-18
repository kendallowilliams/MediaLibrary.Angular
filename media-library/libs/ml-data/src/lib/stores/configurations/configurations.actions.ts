import { createAction, props } from '@ngrx/store';
import { MusicConfiguration } from '../../models/configurations/MusicConfiguration.interface';
import { PlaylistConfiguration } from '../../models/configurations/PlaylistConfiguration.interface';
import { PlayerConfiguration } from '../../models/configurations/PlayerConfiguration.interface';
import { PodcastConfiguration } from '../../models/configurations/PodcastConfiguration.interface';
import { TelevisionConfiguration } from '../../models/configurations/TelevisionConfiguration.interface';
import { MediaLibraryConfiguration } from '../../models/configurations/MediaLibraryConfiguration.interface';

export class ConfigurationsActions {
  public static loadMusicConfiguration = createAction('[Configurations/API] Load Music Configuration');
  public static loadMusicConfigurationSuccess = createAction(
    '[Configurations/API] Load Music Configuration Success',
    props<{ configuration: MusicConfiguration }>(),
  );

  public static loadMusicConfigurationFailure = createAction(
    '[Configurations/API] Load Music Configuration Failure',
    props<{ error: string }>(),
  );
  public static updateMusicConfiguration = createAction('[Configurations/API] Update Music Configuration', 
    props<{ configuration: MusicConfiguration }>()
  );
  public static updateMusicConfigurationSuccess = createAction(
    '[Configurations/API] Update Music Configuration Success',
    props<{ configuration: MusicConfiguration }>(),
  );
  public static updateMusicConfigurationFailure = createAction(
    '[Configurations/API] Update Music Configuration Failure',
    props<{ error: string }>(),
  );

  public static loadMediaLibraryConfiguration = createAction('[Configurations/API] Load MediaLibrary Configuration');
  public static loadMediaLibraryConfigurationSuccess = createAction(
    '[Configurations/API] Load MediaLibrary Configuration Success',
    props<{ configuration: MediaLibraryConfiguration }>(),
  );
  public static loadMediaLibraryConfigurationFailure = createAction(
    '[Configurations/API] Load MediaLibrary Configuration Failure',
    props<{ error: string }>(),
  );
  public static updateMediaLibraryConfiguration = createAction('[Configurations/API] Update MediaLibrary Configuration', 
    props<{ configuration: MediaLibraryConfiguration }>()
  );
  public static updateMediaLibraryConfigurationSuccess = createAction(
    '[Configurations/API] Update MediaLibrary Configuration Success',
    props<{ configuration: MediaLibraryConfiguration }>(),
  );
  public static updateMediaLibraryConfigurationFailure = createAction(
    '[Configurations/API] Update MediaLibrary Configuration Failure',
    props<{ error: string }>(),
  );

  public static loadTelevisionConfiguration = createAction('[Configurations/API] Load Television Configuration');
  public static loadTelevisionConfigurationSuccess = createAction(
    '[Configurations/API] Load Television Configuration Success',
    props<{ configuration: TelevisionConfiguration }>(),
  );
  public static loadTelevisionConfigurationFailure = createAction(
    '[Configurations/API] Load Television Configuration Failure',
    props<{ error: string }>(),
  );
  public static updateTelevisionConfiguration = createAction('[Configurations/API] Update Television Configuration', 
    props<{ configuration: TelevisionConfiguration }>()
  );
  public static updateTelevisionConfigurationSuccess = createAction(
    '[Configurations/API] Update Television Configuration Success',
    props<{ configuration: TelevisionConfiguration }>(),
  );
  public static updateTelevisionConfigurationFailure = createAction(
    '[Configurations/API] Update Television Configuration Failure',
    props<{ error: string }>(),
  );

  public static loadPlaylistConfiguration = createAction('[Configurations/API] Load Playlist Configuration');
  public static loadPlaylistConfigurationSuccess = createAction(
    '[Configurations/API] Load Playlist Configuration Success',
    props<{ configuration: PlaylistConfiguration }>(),
  );
  public static loadPlaylistConfigurationFailure = createAction(
    '[Configurations/API] Load Playlist Configuration Failure',
    props<{ error: string }>(),
  );
  public static updatePlaylistConfiguration = createAction('[Configurations/API] Update Playlist Configuration', 
    props<{ configuration: PlaylistConfiguration }>()
  );
  public static updatePlaylistConfigurationSuccess = createAction(
    '[Configurations/API] Update Playlist Configuration Success',
    props<{ configuration: PlaylistConfiguration }>(),
  );
  public static updatePlaylistConfigurationFailure = createAction(
    '[Configurations/API] Update Playlist Configuration Failure',
    props<{ error: string }>(),
  );

  public static loadPlayerConfiguration = createAction('[Configurations/API] Load Player Configuration');
  public static loadPlayerConfigurationSuccess = createAction(
    '[Configurations/API] Load Player Configuration Success',
    props<{ configuration: PlayerConfiguration }>(),
  );
  public static loadPlayerConfigurationFailure = createAction(
    '[Configurations/API] Load Player Configuration Failure',
    props<{ error: string }>(),
  );
  public static updatePlayerConfiguration = createAction('[Configurations/API] Update Player Configuration', 
    props<{ configuration: PlayerConfiguration }>()
  );
  public static updatePlayerConfigurationSuccess = createAction(
    '[Configurations/API] Update Player Configuration Success',
    props<{ configuration: PlayerConfiguration }>(),
  );
  public static updatePlayerConfigurationFailure = createAction(
    '[Configurations/API] Update Player Configuration Failure',
    props<{ error: string }>(),
  );

  public static loadPodcastConfiguration = createAction('[Configurations/API] Load Podcast Configuration');
  public static loadPodcastConfigurationSuccess = createAction(
    '[Configurations/API] Load Podcast Configuration Success',
    props<{ configuration: PodcastConfiguration }>(),
  );
  public static loadPodcastConfigurationFailure = createAction(
    '[Configurations/API] Load Podcast Configuration Failure',
    props<{ error: string }>(),
  );
  public static updatePodcastConfiguration = createAction('[Configurations/API] Update Podcast Configuration', 
    props<{ configuration: PodcastConfiguration }>()
  );
  public static updatePodcastConfigurationSuccess = createAction(
    '[Configurations/API] Update Podcast Configuration Success',
    props<{ configuration: PodcastConfiguration }>(),
  );
  public static updatePodcastConfigurationFailure = createAction(
    '[Configurations/API] Update Podcast Configuration Failure',
    props<{ error: string }>(),
  );
}

