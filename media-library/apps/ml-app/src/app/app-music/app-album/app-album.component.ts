import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Album, MusicService, Track } from '@media-library/ml-data';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './app-album.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAlbumComponent implements OnInit {
  @Input() public album?: Album | null;

  protected tracks$: Subject<Track[]>;

  constructor(private _musicService: MusicService) {
    this.tracks$ = new Subject<Track[]>();
  }

  public ngOnInit(): void {
    this._musicService.getAlbumTracks(this.album?.id || 0)
      .subscribe(tracks => this.tracks$.next(tracks));
  }
}
