import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaylistConfiguration } from '@media-library/ml-data';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService {
  protected _controller = 'playlist';

  constructor(protected _http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<PlaylistConfiguration> {
    return this.getBaseConfiguration<PlaylistConfiguration>(this._controller);
  }
}
