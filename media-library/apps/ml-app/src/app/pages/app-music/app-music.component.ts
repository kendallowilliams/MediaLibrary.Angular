import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicConfiguration, Album, Artist, Track, Playlist, MlDataFeatureState, MusicActions } from '@media-library/ml-data';
import { faMusic, faCompactDisc, faUser, faHeadphones, faList, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-music',
  templateUrl: './app-music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMusicComponent implements OnInit {
  private _defaultClasses = `flex items-center justify-center w-full h-full`;
  @HostBinding('class') private _class = this._defaultClasses;

  private _configuration?: MusicConfiguration;

  public faMusic = faMusic;
  public faCompactDisc = faCompactDisc;
  public faUser = faUser;
  public faHeadphones = faHeadphones;
  public faList = faList;
  public faXmark = faXmark;
  public albums: Album[] = [];
  public artists: Artist[] = [];
  public tracks: Track[] = [];
  public playlists: Playlist[] = [];

  constructor(private _store: Store<MlDataFeatureState>, private _destroyRef: DestroyRef) {
  }

  public ngOnInit(): void {
    this._store.dispatch(MusicActions.loadAlbums());
    this._store.dispatch(MusicActions.loadArtists());
    this._store.dispatch(MusicActions.loadTracks());
  }
}
