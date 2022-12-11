import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MusicService, MusicConfiguration, Album, Artist, Track } from '@media-library/ml-data';
import { BehaviorSubject, zip } from 'rxjs';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'ml-music',
  templateUrl: './music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent implements OnInit, OnDestroy {
  private _defaultClasses = 'block w-full h-full p-[20px]';
  @HostBinding('class') private _class = this._defaultClasses;
  private _configuration!: MusicConfiguration;

  protected albums$ = new BehaviorSubject<Album[]>([]);
  protected artists$ = new BehaviorSubject<Artist[]>([]);
  protected tracks$ = new BehaviorSubject<Track[]>([]);

  constructor(private _musicService: MusicService, private _loadingService: LoadingService) {
  }
  
  public ngOnInit(): void {
    this._loadData();
  }

  public ngOnDestroy(): void {
    this.albums$.unsubscribe();
    this.artists$.unsubscribe();
    this.tracks$.unsubscribe();
  }

  private _loadData() : void {
    this._loadingService.getLoading$().next(true);
    zip(this._musicService.getConfiguration(),
      this._musicService.getAlbums(),
      this._musicService.getArtists(),
      this._musicService.getTracks()
    ).subscribe(results => {
      this._configuration = results[0];
      this.albums$.next(results[1]);
      this.artists$.next(results[2]);
      this.tracks$.next(results[3]);
      this._loadingService.getLoading$().next(false);
    });
  }

  protected getArtist(artists: Artist[], id: number) : Artist | undefined {
    return artists.find(a => a.id === id);
  }

  protected getAlbumByArtistId(artistId: number) : Album[] | undefined {
    const albums = this.albums$.getValue();

    return albums.filter(a => a.artistId === artistId);
  }
}
