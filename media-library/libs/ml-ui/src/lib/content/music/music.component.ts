import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MusicService } from '@media-library/ml-data';

@Component({
  selector: 'ml-music',
  templateUrl: './music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent {
  constructor(private _musicService: MusicService) {

  }
}
