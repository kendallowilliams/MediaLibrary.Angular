import { PlaylistPages, PlaylistSort, PlaylistTabs } from "../../enums/enums";
import { Configuration } from "./configuration.interface";

export interface PlaylistConfiguration extends Configuration {
    SelectedPlaylistId: number;
    SelectedPlaylistPage: PlaylistPages;
    SelectedMusicPlaylistSort: PlaylistSort;
    SelectedPodcastPlaylistSort: PlaylistSort;
    SelectedTelevisionPlaylistSort: PlaylistSort;
    SelectedPlaylistTab: PlaylistTabs;
    MaxSystemPlaylistItems: number;
}