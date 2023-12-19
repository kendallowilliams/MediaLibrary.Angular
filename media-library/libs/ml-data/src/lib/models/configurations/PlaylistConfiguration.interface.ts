import { PlaylistPages, PlaylistSort, PlaylistTabs } from "../../../lib/enums/enums";
import { Configuration } from "./Configuration.interface";

export interface PlaylistConfiguration extends Configuration {
    selectedPlaylistId: number;
    selectedPlaylistPage: PlaylistPages;
    selectedMusicPlaylistSort: PlaylistSort;
    selectedPodcastPlaylistSort: PlaylistSort;
    selectedTelevisionPlaylistSort: PlaylistSort;
    selectedPlaylistTab: PlaylistTabs;
    maxSystemPlaylistItems: number;
}