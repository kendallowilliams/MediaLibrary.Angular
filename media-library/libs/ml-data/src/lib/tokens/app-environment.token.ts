import { InjectionToken } from "@angular/core";
import { Environment } from "../interfaces/environment.interface";

export const APP_ENVIRONMENT = new InjectionToken<Environment>('APP_ENVIRONMENT');