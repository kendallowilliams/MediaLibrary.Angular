import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MusicConfiguration, Album, Artist, Track, MusicService, MusicTabs } from '@media-library/ml-data';
import { FaIconService, LoadingService, MessageBoxService, ModalComponent } from '@media-library/ml-ui';
import { BehaviorSubject, Observable, zip } from 'rxjs';

@Component({
  selector: 'app-music',
  templateUrl: './app-music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMusicComponent implements OnInit, OnDestroy {
  private _defaultClasses = 'block w-full h-full p-[20px]';
  @HostBinding('class') private _class = this._defaultClasses;
  @ViewChild('musicModal') protected musicModal!: ModalComponent;

  private _configuration!: MusicConfiguration;

  protected selectedItemType$: BehaviorSubject<MusicTabs | undefined>;
  protected selectedAlbum$: BehaviorSubject<Album | undefined>;
  protected selectedArtist$: BehaviorSubject<Artist | undefined>;
  protected selectedTrack$: BehaviorSubject<Track | undefined>;
  protected albums$ = new BehaviorSubject<Album[]>([]);
  protected artists$ = new BehaviorSubject<Artist[]>([]);
  protected tracks$ = new BehaviorSubject<Track[]>([]);
  protected musicTabsEnum = MusicTabs;
  protected isLoading$: Observable<boolean>;
  protected expandIcon?: IconDefinition;

  constructor(private _musicService: MusicService, private _loadingService: LoadingService, private _messageBoxService: MessageBoxService,
    private _faIconService: FaIconService) {
    this.selectedItemType$ = new BehaviorSubject<MusicTabs | undefined>(undefined);
    this.selectedArtist$ = new BehaviorSubject<Artist | undefined>(undefined);
    this.selectedAlbum$ = new BehaviorSubject<Album | undefined>(undefined);
    this.selectedTrack$ = new BehaviorSubject<Track | undefined>(undefined);
    this.isLoading$ = this._loadingService.getLoading$().asObservable();
    this.expandIcon = this._faIconService.getIconDefinition('fas', 'expand');
  }
  
  public ngOnInit(): void {
    this._loadData();
  }

  public ngOnDestroy(): void {
    this.artists$.unsubscribe();
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
    const albums = this.albums$.getValue() ?? [],
      album = albums.find(a => a.id === id),
      success = (_album: Album) => {
        this.selectedItemType$.next(MusicTabs.Albums);
        this.selectedAlbum$.next(_album);
        this.musicModal.showModal();
      };

      if (album) {
        success(album);
      } else {
        this._musicService.getAlbum(id)
          .subscribe(album => {
            if (album) {
              success(album);
            } else {
              console.warn(`Album [Id: ${id}] not found.`);
            }
          });
      }
  }

  protected expandArtist(id: number) : void {
    const artists = this.artists$.getValue() ?? [],
      artist = artists.find(a => a.id === id),
      success = (_artist: Artist) => {
        this.selectedItemType$.next(MusicTabs.Artists);
        this.selectedArtist$.next(_artist);
        this.musicModal.showModal();
      };

      if (artist) {
        success(artist);
      } else {
        this._musicService.getArtist(id)
          .subscribe(artist => {
            if (artist) {
              success(artist);
            } else {
              console.warn(`Album [Id: ${id}] not found.`);
            }
          });
      }
  }

  protected closeModal() : void {
    this.selectedItemType$.next(undefined);
    this.selectedAlbum$.next(undefined);
    this.selectedArtist$.next(undefined);
    this.selectedTrack$.next(undefined);
    this.musicModal.hide();
  }
}
