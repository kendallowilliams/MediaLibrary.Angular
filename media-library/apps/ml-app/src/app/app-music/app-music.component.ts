import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MusicConfiguration, Album, Artist, Track, MusicService, PlaylistService, MusicCategory } from '@media-library/ml-data';
import { LoadingComponent, MessageBoxService, ModalRef, ModalService } from '@media-library/ml-ui';
import { Playlist } from '@media-library/ml-data';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { faMusic, faCompactDisc, faUser, faHeadphones, faList, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-music',
  templateUrl: './app-music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMusicComponent implements OnInit, OnDestroy {
  private _defaultClasses = `flex items-center justify-center w-full h-full`;
  @HostBinding('class') private _class = this._defaultClasses;

  private _configuration?: MusicConfiguration;
  private _loadingModalRef?: ModalRef<LoadingComponent>;

  protected faMusic = faMusic;
  protected faCompactDisc = faCompactDisc;
  protected faUser = faUser;
  protected faHeadphones = faHeadphones;
  protected faList = faList;
  protected faXmark = faXmark;
  protected albums$ = new BehaviorSubject<Album[]>([]);
  protected artists$ = new BehaviorSubject<Artist[]>([]);
  protected tracks$ = new BehaviorSubject<Track[]>([]);
  protected playlists$ = new BehaviorSubject<Playlist[]>([]);

  protected selectedCategory$ = new Subject<MusicCategory | null>();
  protected selectedSubCategory$ = new Subject<MusicCategory | null>();
  protected selectedCategoryIcon$ = new Subject<IconDefinition>();
  protected selectedItemId = 0;

  constructor(private _musicService: MusicService, private _modalService: ModalService, private _messageBoxService: MessageBoxService,
    private _vcr: ViewContainerRef, private _playlistService: PlaylistService, private _cd: ChangeDetectorRef) {
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

  protected getAlbumsByArtistId(artistId: number) : Album[] | undefined {
    const albums = this.albums$.getValue();

    return albums.filter(a => a.artistId === artistId);
  }

  protected getTracksByAlbumId(albumId: number) : Album[] | undefined {
    const tracks = this.tracks$.getValue();

    return tracks.filter(a => a.albumId === albumId);
  }

  protected updateCategory(category: MusicCategory) : void {
    this.selectedCategory$.next(category);
    this.selectedSubCategory$.next(null);
  }

  protected updateSubCategory(category: MusicCategory, id: number) : void {
    this.selectedItemId = id;
    this.selectedSubCategory$.next(category);
  }
}
