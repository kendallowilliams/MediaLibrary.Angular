import { AppWidth, MediaPages } from "../../../lib/enums/enums";
import { Configuration } from "./configuration.interface";

export interface MediaLibraryConfiguration extends Configuration {
    selectedMediaPage: MediaPages;
    appWidth: AppWidth;
    navBarDelay: number;
    tooltipsEnabled: boolean;
    settingsDelay: number;
    keysEnabled: boolean;
    consoleAppRunInterval: number;
    consoleAppLastRunTimeStamp: string;
    darkMode: boolean;
}