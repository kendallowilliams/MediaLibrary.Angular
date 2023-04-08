import { MediaTypes, RepeatTypes, PlayerPages } from "../../../lib/enums/enums";
import { KeyValuePair } from "../collections/KeyValuePair.interface";
import { ListItem } from "../collections/ListItem.interface";
import { Configuration } from "./Configuration.interface";

export interface PlayerConfiguration extends Configuration {
    SelectedMediaType: MediaTypes;
    CurrentItemIndex: number;
    AutoPlay: boolean;
    Repeat: RepeatTypes;
    Shuffle: boolean;
    SelectedPlayerPage: PlayerPages;
    Volume: number;
    Muted: boolean;
    AudioVisualizerEnabled: boolean;
    SkipForwardSeconds: number;
    SkipBackwardSeconds: number;
    NowPlayingList: ListItem<number, number>[];
    ProgressUpdateInterval: number;
    AudioVisualizerBarCount: number;
    NowPlayingLists: Array<KeyValuePair<MediaTypes, ListItem<number, number>[]>>;
}