import { PodcastPages, PodcastSort, PodcastFilter } from "../../enums/enums";
import { Configuration } from "./Configuration.interface";

export interface PodcastConfiguration extends Configuration {
    SelectedPodcastId: number;
    SelectedPodcastPage: PodcastPages;
    SelectedPodcastSort: PodcastSort;
    SelectedPodcastFilter: PodcastFilter;
    LastAutoDownloadDate: Date;
}