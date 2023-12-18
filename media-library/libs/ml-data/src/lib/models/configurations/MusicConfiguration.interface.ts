import { AlbumSort, ArtistSort, SongSort, MusicTabs, MusicPages } from "../../../lib/enums/enums";
import { Configuration } from "./Configuration.interface";

export interface MusicConfiguration extends Configuration {
    selectedAlbumId: number;
    selectedArtistId: number;
    selectedAlbumSort: AlbumSort;
    selectedArtistSort: ArtistSort;
    selectedSongSort: SongSort;
    selectedMusicTab: MusicTabs;
    selectedMusicPage: MusicPages;
    previousSearchQuery: string;
    musicPaths: string[];
}