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
  musicPaths: [],
  ScrollTop: 0,
  PromptBeforeUnload: false
};
export const mediaLibraryConfiguration: MediaLibraryConfiguration = {
  SelectedMediaPage: MediaPages.Home,
  AppWidth: AppWidth.Normal,
  NavBarDelay: 0,
  TooltipsEnabled: false,
  SettingsDelay: 0,
  KeysEnabled: false,
  ConsoleAppRunInterval: 0,
  ConsoleAppLastRunTimeStamp: "",
  DarkMode: false,
  ScrollTop: 0,
  PromptBeforeUnload: false
};
export const televisionConfiguration: TelevisionConfiguration = {
  SelectedSeriesId: 0,
  SelectedSeason: 0,
  SelectedTelevisionPage: TelevisionPages.Index,
  SelectedSeriesSort: SeriesSort.AtoZ,
  FilePath: "",
  ScrollTop: 0,
  PromptBeforeUnload: false
};
export const podcastConfiguration: PodcastConfiguration = {
  SelectedPodcastId: 0,
  SelectedPodcastPage: PodcastPages.Index,
  SelectedPodcastSort: PodcastSort.LastUpdateDate,
  SelectedPodcastFilter: PodcastFilter.All,
  LastAutoDownloadDate: undefined,
  ScrollTop: 0,
  PromptBeforeUnload: false
};
export const playerConfiguration: PlayerConfiguration = {
  SelectedMediaType: MediaTypes.Song,
  CurrentItemIndex: 0,
  AutoPlay: false,
  Repeat: RepeatTypes.None,
  Shuffle: false,
  SelectedPlayerPage: PlayerPages.Index,
  Volume: 0,
  Muted: false,
  AudioVisualizerEnabled: false,
  SkipForwardSeconds: 0,
  SkipBackwardSeconds: 0,
  NowPlayingList: [],
  ProgressUpdateInterval: 0,
  AudioVisualizerBarCount: 0,
  NowPlayingLists: [],
  ScrollTop: 0,
  PromptBeforeUnload: false
};
export const playlistConfiguration: PlaylistConfiguration = {
  SelectedPlaylistId: 0,
  SelectedPlaylistPage: PlaylistPages.Index,
  SelectedMusicPlaylistSort: PlaylistSort.AtoZ,
  SelectedPodcastPlaylistSort: PlaylistSort.AtoZ,
  SelectedTelevisionPlaylistSort: PlaylistSort.AtoZ,
  SelectedPlaylistTab: PlaylistTabs.Music,
  MaxSystemPlaylistItems: 0,
  ScrollTop: 0,
  PromptBeforeUnload: false
};