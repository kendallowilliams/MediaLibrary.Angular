import { TelevisionPages, SeriesSort } from "../../../lib/enums/enums";
import { Configuration } from "./configuration.interface";

export interface TelevisionConfiguration extends Configuration {
    selectedSeriesId: number;
    selectedSeason: number;
    selectedTelevisionPage: TelevisionPages;
    selectedSeriesSort: SeriesSort;
    filePath: string;
}