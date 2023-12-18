import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PodcastConfiguration } from '../../models/configurations/PodcastConfiguration.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PodcastService extends BaseService {
  protected _controller = 'podcast';

  constructor(protected _http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<PodcastConfiguration> {
    return this.getBaseConfiguration<PodcastConfiguration>(this._controller);
  }

  public updateConfiguration(configuration: PodcastConfiguration): Observable<PodcastConfiguration> {
    return this.updateBaseConfiguration<PodcastConfiguration>(this._controller, configuration);
  }
}
