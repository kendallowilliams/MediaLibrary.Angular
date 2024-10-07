import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicConfiguration, Playlist, MlDataFeatureState, MusicActions, selectAllAlbums, selectAllArtists, selectAllTracks, Track, selectTrack, selectAllPlaylists, PlaylistsActions } from '@media-library/ml-data';
import { faMusic, faCompactDisc, faUser, faHeadphones, faList, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

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
  public playlists$ = this._store.select(selectAllPlaylists);
  public selectedSong?: Track;
  public playlists: Playlist[] = [];
  public isEditModalOpen = false;
  public isAddToPlaylistModalOpen = false;

  constructor(private _store: Store<MlDataFeatureState>) {
  }

  public ngOnInit(): void {
    this._store.dispatch(MusicActions.loadAlbums());
    this._store.dispatch(MusicActions.loadArtists());
    this._store.dispatch(MusicActions.loadTracks());
  }

  public showEditSongModal(id: number) : void {
    this.isEditModalOpen = !!id;
    this._store.select(selectTrack(id))
      .pipe(tap(track => this.selectedSong = track))
      .subscribe();
  }

  public showAddSongToPlaylistModal(id: number) : void {
    this._store.dispatch(PlaylistsActions.loadPlaylists());
    this.isAddToPlaylistModalOpen = !!id;
  }
}
