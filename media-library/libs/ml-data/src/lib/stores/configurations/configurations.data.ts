import { AlbumSort, AppWidth, ArtistSort, MediaPages, MediaTypes, MusicPages, MusicTabs, PlayerPages, PlaylistPages, PlaylistSort, PlaylistTabs, PodcastFilter, PodcastPages, PodcastSort, RepeatTypes, SeriesSort, SongSort, TelevisionPages } from "../../enums/enums";
import { MediaLibraryConfiguration } from "../../models/configurations/MediaLibraryConfiguration.interface";
import { MusicConfiguration } from "../../models/configurations/MusicConfiguration.interface";
import { PlayerConfiguration } from "../../models/configurations/PlayerConfiguration.interface";
import { PlaylistConfiguration } from "../../models/configurations/PlaylistConfiguration.interface";
import { PodcastConfiguration } from "../../models/configurations/PodcastConfiguration.interface";
import { TelevisionConfiguration } from "../../models/configurations/TelevisionConfiguration.interface";

export const musicConfiguration: MusicConfiguration = {
  selectedAlbumId: 0,
  selectedArtistId: 0,
  selectedAlbumSort: AlbumSort.AtoZ,
  selectedArtistSort: ArtistSort.AtoZ,
  selectedSongSort: SongSort.AtoZ,
  selectedMusicTab: MusicTabs.Albums,
  selectedMusicPage: MusicPages.Index,
  previousSearchQuery: "",
  musicPaths: ['A:/albums', 'B:/artists', 'D:/songs'],
  scrollTop: 0,
  promptBeforeUnload: false
};
export const mediaLibraryConfiguration: MediaLibraryConfiguration = {
  selectedMediaPage: MediaPages.Home,
  appWidth: AppWidth.Normal,
  navBarDelay: 0,
  tooltipsEnabled: false,
  settingsDelay: 0,
  keysEnabled: false,
  consoleAppRunInterval: 0,
  consoleAppLastRunTimeStamp: "",
  darkMode: false,
  scrollTop: 0,
  promptBeforeUnload: false
};
export const televisionConfiguration: TelevisionConfiguration = {
  selectedSeriesId: 0,
  selectedSeason: 0,
  selectedTelevisionPage: TelevisionPages.Index,
  selectedSeriesSort: SeriesSort.AtoZ,
  filePath: "",
  scrollTop: 0,
  promptBeforeUnload: false
};
export const podcastConfiguration: PodcastConfiguration = {
  selectedPodcastId: 0,
  selectedPodcastPage: PodcastPages.Index,
  selectedPodcastSort: PodcastSort.LastUpdateDate,
  selectedPodcastFilter: PodcastFilter.All,
  lastAutoDownloadDate: undefined,
  scrollTop: 0,
  promptBeforeUnload: false
};
export const playerConfiguration: PlayerConfiguration = {
  selectedMediaType: MediaTypes.Song,
  currentItemIndex: 0,
  autoPlay: false,
  repeat: RepeatTypes.None,
  shuffle: false,
  selectedPlayerPage: PlayerPages.Index,
  volume: 0,
  muted: false,
  audioVisualizerEnabled: false,
  skipForwardSeconds: 30,
  skipBackwardSeconds: 15,
  nowPlayingList: [],
  progressUpdateInterval: 5,
  audioVisualizerBarCount: 128,
  nowPlayingLists: [],
  scrollTop: 0,
  promptBeforeUnload: false
};
export const playlistConfiguration: PlaylistConfiguration = {
  selectedPlaylistId: 0,
  selectedPlaylistPage: PlaylistPages.Index,
  selectedMusicPlaylistSort: PlaylistSort.AtoZ,
  selectedPodcastPlaylistSort: PlaylistSort.AtoZ,
  selectedTelevisionPlaylistSort: PlaylistSort.AtoZ,
  selectedPlaylistTab: PlaylistTabs.Music,
  maxSystemPlaylistItems: 0,
  scrollTop: 0,
  promptBeforeUnload: false
};