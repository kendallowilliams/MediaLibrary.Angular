import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { PlaylistService } from '@media-library/ml-data';

@Component({
  selector: 'ml-playlist',
  templateUrl: './playlist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistComponent {
  constructor(private _playlistService: PlaylistService) {}
}
