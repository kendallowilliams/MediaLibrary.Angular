﻿import { AppWidth, MediaPages } from "../../../lib/enums/enums";
import { Configuration } from "./Configuration.interface";

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