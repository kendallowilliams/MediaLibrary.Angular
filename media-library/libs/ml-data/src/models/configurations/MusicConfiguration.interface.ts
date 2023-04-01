import { AlbumSort, ArtistSort, SongSort, MusicTabs, MusicPages } from "../../enums/enums";
import { Configuration } from "./Configuration.interface";

export interface MusicConfiguration extends Configuration {
    SelectedAlbumId: number;
    SelectedArtistId: number;
    SelectedAlbumSort: AlbumSort;
    SelectedArtistSort: ArtistSort;
    SelectedSongSort: SongSort;
    SelectedMusicTab: MusicTabs;
    SelectedMusicPage: MusicPages;
    PreviousSearchQuery: string;
    MusicPaths: string[];
}