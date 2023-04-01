import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaylistConfiguration } from '../../models/configurations/playlist-configuration.interface';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';
import { Playlist } from '../../models/playlist/Playlist.model';

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

  public getMusicPlaylists() : Observable<Playlist[]> {
    return this.get<Playlist[]>(this._controller, 'GetByType?playlistType=0');
  }
}
