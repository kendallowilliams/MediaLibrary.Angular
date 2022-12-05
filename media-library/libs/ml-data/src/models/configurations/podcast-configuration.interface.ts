import { PodcastPages, PodcastSort, PodcastFilter } from "../../enums/enums";
import { Configuration } from "./configuration.interface";

export interface PodcastConfiguration extends Configuration {
    SelectedPodcastId: number;
    SelectedPodcastPage: PodcastPages;
    SelectedPodcastSort: PodcastSort;
    SelectedPodcastFilter: PodcastFilter;
    LastAutoDownloadDate: Date;
}