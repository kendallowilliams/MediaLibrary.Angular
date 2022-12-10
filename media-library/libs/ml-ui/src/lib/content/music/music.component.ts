import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MusicService, MusicConfiguration, Album, Artist, Track } from '@media-library/ml-data';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ml-music',
  templateUrl: './music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent implements OnInit, OnDestroy {
  private _defaultClasses = 'block w-full h-full p-[20px]';
  @HostBinding('class') private _class = this._defaultClasses;
  private _configuration?: MusicConfiguration;

  protected albums$ = new BehaviorSubject<Album[]>([]);
  protected artists$ = new BehaviorSubject<Artist[]>([]);
  protected tracks$ = new BehaviorSubject<Track[]>([]);

  constructor(private _musicService: MusicService) {
  }
  
  public ngOnInit(): void {
    this._musicService.getConfiguration()
      .subscribe(config => this._configuration = config);
    this._musicService.getAlbums()
      .subscribe(albums => this.albums$.next(albums));
      this._musicService.getArtists()
        .subscribe(artists => this.artists$.next(artists));
        this._musicService.getTracks()
          .subscribe(tracks => this.tracks$.next(tracks));
  }

  public ngOnDestroy(): void {
    this.albums$.unsubscribe();
    this.artists$.unsubscribe();
    this.tracks$.unsubscribe();
  }

  protected getArtist(artists: Artist[], id: number) : Artist | undefined {
    return artists.find(a => a.id === id);
  }
}
