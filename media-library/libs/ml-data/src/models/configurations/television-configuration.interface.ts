import { TelevisionPages, SeriesSort } from "../../enums/enums";
import { Configuration } from "./configuration.interface";

export interface TelevisionConfiguration extends Configuration {
    SelectedSeriesId: number;
    SelectedSeason: number;
    SelectedTelevisionPage: TelevisionPages;
    SelectedSeriesSort: SeriesSort;
    FilePath: string;
}