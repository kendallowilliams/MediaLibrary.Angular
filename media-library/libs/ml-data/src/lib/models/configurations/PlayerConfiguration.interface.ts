import { MediaTypes, RepeatTypes, PlayerPages } from "../../../lib/enums/enums";
import { KeyValuePair } from "../collections/KeyValuePair.interface";
import { ListItem } from "../collections/ListItem.interface";
import { Configuration } from "./Configuration.interface";

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
    nowPlayingList: ListItem<number, number>[];
    progressUpdateInterval: number;
    audioVisualizerBarCount: number;
    nowPlayingLists: Array<KeyValuePair<MediaTypes, ListItem<number, number>[]>>;
}