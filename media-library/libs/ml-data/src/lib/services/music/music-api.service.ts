import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicConfiguration } from '../../models/configurations/music-configuration.interface';
import { Album } from '../../models/music/album.model';
import { Artist } from '../../models/music/artist.model';
import { Track } from '../../models/music/track.model';
import { BaseApiService } from '../base-api.service';
import { Genre } from '../../models/music/genre.model';

@Injectable({
  providedIn: 'root'
})
export class MusicApiService extends BaseApiService {
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

  /** Genre */
  public getGenres(): Observable<Genre[]> {
    return this.get<Genre[]>(this.controller, 'Genres');
  }

}
