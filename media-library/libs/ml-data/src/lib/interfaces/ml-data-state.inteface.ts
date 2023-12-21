import { ConfigurationsState } from "../stores/configurations/configurations.reducer";
import { MusicState } from "../stores/music/music.reducer";
import { PlaylistsState } from "../stores/playlists/playlists.reducer";
import { PodcastsState } from "../stores/podcasts/podcasts.reducer";
import { TelevisionState } from "../stores/television/television.reducer";

export interface MlDataFeatureState {
  configurations: ConfigurationsState;
  music: MusicState;
  television: TelevisionState;
  playlists: PlaylistsState;
  podcasts: PodcastsState;
}