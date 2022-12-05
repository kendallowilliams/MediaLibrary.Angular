import { MediaTypes, RepeatTypes, PlayerPages } from "../../enums/enums";
import { KeyValuePair } from "../collections/key-value-pair.interface";
import { ListItem } from "../collections/list-item.interface";
import { Configuration } from "./configuration.interface";

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