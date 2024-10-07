import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlaylistConfiguration } from '../../models/configurations/playlist-configuration.interface';
import { Observable, of } from 'rxjs';
import { BaseService } from '../base.service';
import { Playlist } from '../../models/playlist/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService extends BaseService {
  public controller = 'playlist';

  constructor(public http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<PlaylistConfiguration> {
    return this.getBaseConfiguration<PlaylistConfiguration>(this.controller);
  }

  public updateConfiguration(configuration: PlaylistConfiguration): Observable<PlaylistConfiguration> {
    return this.updateBaseConfiguration<PlaylistConfiguration>(this.controller, configuration);
  }

  public getPlaylists() : Observable<Playlist[]> {
    return this.get<Playlist[]>(this.controller, 'Get');
  }

  public getMusicPlaylists() : Observable<Playlist[]> {
    return this.get<Playlist[]>(this.controller, 'GetByType?playlistType=0');
  }
}
