import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicConfiguration } from '../../models/configurations/music-configuration.interface';
import { Album } from '../../models/music/album.model';
import { Artist } from '../../models/music/artist.model';
import { Track } from '../../models/music/track.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService extends BaseService {
  protected _controller = 'music';

  constructor(protected _http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<MusicConfiguration> {
    return this.getBaseConfiguration<MusicConfiguration>(this._controller);
  }

  public updateConfiguration(configuration: MusicConfiguration): Observable<MusicConfiguration> {
    return this.updateBaseConfiguration<MusicConfiguration>(this._controller, configuration);
  }

  public getAlbums(): Observable<Album[]> {
    return this.get<Album[]>(this._controller, 'Albums');
  }

  public getArtists(): Observable<Artist[]> {
    return this.get<Artist[]>(this._controller, 'Artists');
  }

  public getTracks(): Observable<Track[]> {
    return this.get<Track[]>(this._controller, 'Tracks');
  }
}
