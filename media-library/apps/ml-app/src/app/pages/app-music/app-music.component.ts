import { ChangeDetectionStrategy, Component, HostBinding, OnDestroy, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { MusicConfiguration, Album, Artist, Track, MusicService, PlaylistService, MusicCategory } from '@media-library/ml-data';
import { MessageBoxService, ModalRef, ModalService } from '@media-library/ml-ui';
import { Playlist } from '@media-library/ml-data';
import { BehaviorSubject, Subject, zip } from 'rxjs';
import { faMusic, faCompactDisc, faUser, faHeadphones, faList, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

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
  private _loadingModalRef?: ModalRef<FaIconComponent>;

  public faMusic = faMusic;
  public faCompactDisc = faCompactDisc;
  public faUser = faUser;
  public faHeadphones = faHeadphones;
  public faList = faList;
  public faXmark = faXmark;
  public albums$ = new BehaviorSubject<Album[]>([]);
  public artists$ = new BehaviorSubject<Artist[]>([]);
  public tracks$ = new BehaviorSubject<Track[]>([]);
  public playlists$ = new BehaviorSubject<Playlist[]>([]);

  public selectedCategory$ = new Subject<MusicCategory | null>();
  public selectedCategoryIcon$ = new Subject<IconDefinition>();
  public subCategory$ = new Subject<{ id: number, type: MusicCategory}>();

  constructor(private _musicService: MusicService, private _modalService: ModalService, private _messageBoxService: MessageBoxService,
    private _vcr: ViewContainerRef, private _playlistService: PlaylistService) {
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
    this._loadingModalRef = this._modalService.showLoadingModal();
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
      error: (error) => this._messageBoxService.error('Error', error.message),
      complete: () => this._loadingModalRef?.hide()
    });
  }

  public getArtist(artists: Artist[], id: number) : Artist | undefined {
    return artists.find(a => a.id === id);
  }

  public getAlbumsByArtistId(artistId: number) : Album[] | undefined {
    const albums = this.albums$.getValue();

    return albums.filter(a => a.artistId === artistId);
  }

  public getTracksByAlbumId(albumId: number) : Album[] | undefined {
    const tracks = this.tracks$.getValue();

    return tracks.filter(a => a.albumId === albumId);
  }

  public updateCategory(category: MusicCategory) : void {
    this.selectedCategory$.next(category);
  }

  public addSubCategory(category: MusicCategory, id: number) : void {
    this.subCategory$.next({ id: id, type: category });
  }
}
