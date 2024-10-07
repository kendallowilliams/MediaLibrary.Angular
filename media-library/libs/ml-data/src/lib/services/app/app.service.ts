import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaLibraryConfiguration } from '../../models/configurations/media-library-configuration.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService {
  public readonly controller = 'medialibrary';

  constructor(public readonly http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<MediaLibraryConfiguration> {
    return this.getBaseConfiguration<MediaLibraryConfiguration>(this.controller);
  }

  public updateConfiguration(configuration: MediaLibraryConfiguration): Observable<MediaLibraryConfiguration> {
    return this.updateBaseConfiguration<MediaLibraryConfiguration>(this.controller, configuration);
  }
}
