import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MusicService } from '@media-library/ml-data';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-album',
  templateUrl: './app-album.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAlbumComponent {
  @Input() public albumId?: number;

  protected faCompactDisc = faCompactDisc;

  constructor(private _musicService: MusicService) {}
}
