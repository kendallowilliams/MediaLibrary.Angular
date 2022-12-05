import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PodcastConfiguration } from '@media-library/ml-data';
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
}
