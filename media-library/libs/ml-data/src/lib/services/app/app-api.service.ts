import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaLibraryConfiguration } from '../../models/configurations/media-library-configuration.interface';
import { Observable } from 'rxjs';
import { BaseApiService } from '../base-api.service';
import { DirectoryModel } from '../../models/app/directory.model';

@Injectable({
  providedIn: 'root'
})
export class AppApiService extends BaseApiService {
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

  public getDirectory(path: string) : Observable<DirectoryModel> {
    const params = new HttpParams().set('path', path);
    return this.get<DirectoryModel>(this.controller, 'GetDirectory', {params});
  }
}
