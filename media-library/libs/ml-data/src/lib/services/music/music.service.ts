import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicConfiguration } from '../../models/configurations/MusicConfiguration.interface';
import { Album } from '../../models/music/Album.model';
import { Artist } from '../../models/music/Artist.model';
import { Track } from '../../models/music/Track.model';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService extends BaseService {
  public controller = 'music';

  constructor(public http: HttpClient) {
    super();
  }

  public getConfiguration(): Observable<MusicConfiguration> {
    return this.getBaseConfiguration<MusicConfiguration>(this.controller);
  }

  public updateConfiguration(configuration: MusicConfiguration): Observable<MusicConfiguration> {
    return this.updateBaseConfiguration<MusicConfiguration>(this.controller, configuration);
  }

  /** Album */
  public getAlbums(): Observable<Album[]> {
    return this.get<Album[]>(this.controller, 'Albums');
  }

  public getAlbum(id: number): Observable<Album> {
    return this.get<Album>(this.controller, `Album/${id}`);
  }


  /** Artist */
  public getArtists(): Observable<Artist[]> {
    return this.get<Artist[]>(this.controller, 'Artists');
  }
  public getArtist(id: number): Observable<Artist> {
    return this.get<Artist>(this.controller, `Artist/${id}`);
  }

  /** Track */
  public getTracks(): Observable<Track[]> {
    return this.get<Track[]>(this.controller, 'Tracks');
  }

  public getTrack(id: number): Observable<Track> {
    return this.get<Track>(this.controller, `Track/${id}`);
  }

  public getAlbumTracks(albumId: number): Observable<Track[]> {
    return this.get<Track[]>(this.controller, `TracksByAlbumId/${albumId}`);
  }
}
