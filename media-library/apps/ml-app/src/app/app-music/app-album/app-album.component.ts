import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Album, MusicService } from '@media-library/ml-data';

@Component({
  selector: 'app-album',
  templateUrl: './app-album.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAlbumComponent {
  @Input() public album?: Album | null;

  constructor(private _musicService: MusicService) {
  }
}
