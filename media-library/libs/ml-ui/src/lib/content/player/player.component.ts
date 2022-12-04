import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { PlayerService } from '@media-library/ml-data';

@Component({
  selector: 'ml-player',
  templateUrl: './player.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  constructor(private _playerService: PlayerService) {}
}
