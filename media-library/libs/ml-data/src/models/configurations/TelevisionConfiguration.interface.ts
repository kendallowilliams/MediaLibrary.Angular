import { TelevisionPages, SeriesSort } from "../../enums/enums";
import { Configuration } from "./Configuration.interface";

export interface TelevisionConfiguration extends Configuration {
    SelectedSeriesId: number;
    SelectedSeason: number;
    SelectedTelevisionPage: TelevisionPages;
    SelectedSeriesSort: SeriesSort;
    FilePath: string;
}