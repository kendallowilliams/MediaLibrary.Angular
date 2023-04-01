import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MusicConfiguration, Album, Artist, Track, MusicService, PlaylistService, MusicTabs } from '@media-library/ml-data';
import { FaIconService, LoadingComponent, MessageBoxService, ModalRef, ModalService } from '@media-library/ml-ui';
import { Playlist } from '@media-library/ml-data';
import { BehaviorSubject, Subject, zip } from 'rxjs';

@Component({
  selector: 'app-music',
  templateUrl: './app-music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMusicComponent implements OnInit, OnDestroy {
  private _defaultClasses = 'flex flex-col items-center justify-center w-full h-full';
  @HostBinding('class') private _class = this._defaultClasses;

  private _configuration!: MusicConfiguration;
  private _loadingModalRef?: ModalRef<LoadingComponent>;

  protected faMusic?: IconDefinition;
  protected albums$ = new BehaviorSubject<Album[]>([]);
  protected artists$ = new BehaviorSubject<Artist[]>([]);
  protected tracks$ = new BehaviorSubject<Track[]>([]);
  protected playlists$ = new BehaviorSubject<Playlist[]>([]);

  protected selectedTab$ = new Subject<MusicTabs | undefined>();

  constructor(private _musicService: MusicService, private _modalService: ModalService, private _messageBoxService: MessageBoxService,
    private _vcr: ViewContainerRef, private _faIconService: FaIconService, private _playlistService: PlaylistService) {
      this.faMusic = this._faIconService.getIconDefinition('fas', 'music');
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
    this._loadingModalRef = this._modalService.showLoadingModal(this._vcr);
    zip(this._musicService.getConfiguration(),
      this._musicService.getAlbums(),
      this._musicService.getArtists(),
      this._musicService.getTracks(),
      this._playlistService.getMusicPlaylists()
    ).subscribe({
      next: (results) => {
        this._configuration = results[0];
        this.albums$.next(results[1]);
        this.artists$.next(results[2]);
        this.tracks$.next(results[3]);
        this.playlists$.next(results[4]);
      },
      error: (error) => this._messageBoxService.error('Error', error.message, this._vcr),
      complete: () => this._loadingModalRef?.hide()
    });
  }

  protected getArtist(artists: Artist[], id: number) : Artist | undefined {
    return artists.find(a => a.id === id);
  }

  protected getAlbumByArtistId(artistId: number) : Album[] | undefined {
    const albums = this.albums$.getValue();

    return albums.filter(a => a.artistId === artistId);
  }

  protected updateMusicTab(tab?: MusicTabs) : void {
    this.selectedTab$.next(tab);
  }
}
