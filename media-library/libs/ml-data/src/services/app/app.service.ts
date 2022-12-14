import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaLibraryConfiguration } from '../../models/configurations/media-library-configuration.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class AppService extends BaseService {
  protected _controller = 'medialibrary';

  constructor(protected _http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<MediaLibraryConfiguration> {
    return this.getBaseConfiguration<MediaLibraryConfiguration>(this._controller);
  }
}
