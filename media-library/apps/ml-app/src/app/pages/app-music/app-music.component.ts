import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { MusicConfiguration, Album, Artist, Track, Playlist } from '@media-library/ml-data';
import { faMusic, faCompactDisc, faUser, faHeadphones, faList, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-music',
  templateUrl: './app-music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppMusicComponent {
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

  constructor(private _destroyRef: DestroyRef) {
  }
}
