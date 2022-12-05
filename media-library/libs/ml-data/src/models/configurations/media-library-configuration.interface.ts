import { AppWidth, MediaPages } from "../../enums/enums";
import { Configuration } from "./configuration.interface";

export interface MediaLibraryConfiguration extends Configuration {
    SelectedMediaPage: MediaPages;
    AppWidth: AppWidth;
    NavBarDelay: number;
    TooltipsEnabled: boolean;
    SettingsDelay: number;
    KeysEnabled: boolean;
    ConsoleAppRunInterval: number;
    ConsoleAppLastRunTimeStamp: string;
    DarkMode: boolean;
}