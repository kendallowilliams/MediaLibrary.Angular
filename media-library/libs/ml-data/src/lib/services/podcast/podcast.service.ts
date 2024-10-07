import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PodcastConfiguration } from '../../models/configurations/podcast-configuration.interface';
import { Observable, of } from 'rxjs';
import { BaseService } from '../base.service';
import { Podcast } from '../../models/podcast/Podcast.model';

@Injectable({
  providedIn: 'root'
})
export class PodcastService extends BaseService {
  public controller = 'podcast';

  constructor(public http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<PodcastConfiguration> {
    return this.getBaseConfiguration<PodcastConfiguration>(this.controller);
  }

  public updateConfiguration(configuration: PodcastConfiguration): Observable<PodcastConfiguration> {
    return this.updateBaseConfiguration<PodcastConfiguration>(this.controller, configuration);
  }

  public getPodcasts(): Observable<Podcast[]> {
    return of([]);
  }
}
