import { PodcastPages, PodcastSort, PodcastFilter } from "../../../lib/enums/enums";
import { Configuration } from "./configuration.interface";

export interface PodcastConfiguration extends Configuration {
    selectedPodcastId: number;
    selectedPodcastPage: PodcastPages;
    selectedPodcastSort: PodcastSort;
    selectedPodcastFilter: PodcastFilter;
    lastAutoDownloadDate?: Date;
}