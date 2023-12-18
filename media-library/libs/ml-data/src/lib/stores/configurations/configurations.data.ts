import { AlbumSort, ArtistSort, MusicPages, MusicTabs, SongSort } from "../../enums/enums";
import { MusicConfiguration } from "../../models/configurations/MusicConfiguration.interface";

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
}