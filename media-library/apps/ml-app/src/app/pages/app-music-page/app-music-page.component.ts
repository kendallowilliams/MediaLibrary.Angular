import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { 
  MusicConfiguration, Playlist, MlDataFeatureState, MusicActions, 
  selectAllAlbums, selectAllArtists, selectAllTracks, Track, selectTrack, PlaylistsActions, 
  selectMusicPlaylists, PlaylistTypes, PlaylistService, selectAllGenres, 
  AddSongToPlaylistsRequest
} from '@media-library/ml-data';
import { faMusic, faCompactDisc, faUser, faHeadphones, faList, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-page',
  templateUrl: './app-music-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMusicPageComponent implements OnInit {
  private _configuration?: MusicConfiguration;

  public faMusic = faMusic;
  public faCompactDisc = faCompactDisc;
  public faUser = faUser;
  public faHeadphones = faHeadphones;
  public faList = faList;
  public faXmark = faXmark;
  public albums$ = this._store.select(selectAllAlbums);
  public artists$ = this._store.select(selectAllArtists);
  public songs$ = this._store.select(selectAllTracks);
  public genres$ = this._store.select(selectAllGenres);
  public playlists$ = this._store.select(selectMusicPlaylists(PlaylistTypes.Music));
  public playlists: Playlist[] = [];
  public isEditModalOpen = false;
  public isAddToPlaylistModalOpen = false;
  public selectedSong$?: Observable<Track | null>;
  public selectedSongId: number | null = null;
  public selectedPlaylistIds$?: Observable<number[]>;

  constructor(private _store: Store<MlDataFeatureState>, private _playlistApi: PlaylistService) {}

  public ngOnInit(): void {
    this._store.dispatch(MusicActions.loadAlbums());
    this._store.dispatch(MusicActions.loadArtists());
    this._store.dispatch(MusicActions.loadTracks());
    this._store.dispatch(MusicActions.loadGenres());
  }

  public showEditSongModal(id: number) : void {
    this.selectedSongId = id;
    this.isEditModalOpen = !!this.selectedSongId;
    this.selectedSong$ = this._store.select(selectTrack(id));
  }

  public showAddSongToPlaylistModal(id: number) : void {
    this._store.dispatch(PlaylistsActions.loadPlaylists());
    this.selectedSongId = id;
    this.selectedSong$ = this._store.select(selectTrack(id));
    this.selectedPlaylistIds$ = this._playlistApi.getSongPlaylistIds(this.selectedSongId);
    this.isAddToPlaylistModalOpen = !!this.selectedSongId;
  }

  public handleIsOpenChange(isOpen: boolean) : void {
    if (!isOpen) {
      this.selectedSongId = null;
    }
  }

  public handlePlaylistIdsChange(request: AddSongToPlaylistsRequest) : void {
    this._store.dispatch(PlaylistsActions.addSongToPlaylists(request));
  }
}
