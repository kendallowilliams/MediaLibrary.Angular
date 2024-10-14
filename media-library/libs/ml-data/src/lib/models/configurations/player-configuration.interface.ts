import { MediaTypes, RepeatTypes, PlayerPages } from "../../enums/enums";
import { ListItem } from "../collections/list-item.interface";
import { Configuration } from "./configuration.interface";

export interface PlayerConfiguration extends Configuration {
    selectedMediaType: MediaTypes;
    currentItemIndex: number;
    autoPlay: boolean;
    repeat: RepeatTypes;
    shuffle: boolean;
    selectedPlayerPage: PlayerPages;
    volume: number;
    muted: boolean;
    audioVisualizerEnabled: boolean;
    skipForwardSeconds: number;
    skipBackwardSeconds: number;
    nowPlayingList: ListItem[];
    progressUpdateInterval: number;
    audioVisualizerBarCount: number;
    //nowPlayingLists: Array<KeyValuePair<MediaTypes, ListItem<number, number>[]>>;
}