import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MusicConfiguration, Album, Artist, Track, MusicService, MusicTabs } from '@media-library/ml-data';
import { LoadingService, MessageBoxService, ModalComponent } from '@media-library/ml-ui';
import { BehaviorSubject, Subject, zip } from 'rxjs';

@Component({
  selector: 'app-music',
  templateUrl: './app-music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMusicComponent implements OnInit, OnDestroy, AfterViewInit {
  private _defaultClasses = 'block w-full h-full p-[20px]';
  @HostBinding('class') private _class = this._defaultClasses;
  @ViewChild('musicModal') protected musicModal!: ModalComponent;

  private _configuration!: MusicConfiguration;

  protected selectedItemType$: Subject<MusicTabs | undefined>;
  protected selectedItemId$: Subject<number | undefined>;
  protected albums$ = new BehaviorSubject<Album[]>([]);
  protected artists$ = new BehaviorSubject<Artist[]>([]);
  protected tracks$ = new BehaviorSubject<Track[]>([]);
  protected musicTabsEnum = MusicTabs;

  constructor(private _musicService: MusicService, private _loadingService: LoadingService, private _messageBoxService: MessageBoxService) {
    this.selectedItemType$ = new Subject<MusicTabs | undefined>();
    this.selectedItemId$ = new Subject<number | undefined>();
  }
  
  public ngOnInit(): void {
    this._loadData();
  }

  public ngAfterViewInit(): void {
    this.musicModal
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

  protected expandAlbum(id: number) : void {
    this.selectedItemType$.next(MusicTabs.Albums);
    this.selectedItemId$.next(id);
    this.musicModal.showModal();
  }

  protected closeModal() : void {
    this.selectedItemType$.next(undefined);
    this.selectedItemId$.next(undefined);
    this.musicModal.hide();
  }
}
