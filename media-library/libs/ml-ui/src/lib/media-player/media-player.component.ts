import { Component, ViewEncapsulation } from '@angular/core';
import { PlayerService } from './services/player.service';

@Component({
  selector: 'ml-media-player',
  templateUrl: './media-player.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MediaPlayerComponent {
  constructor(private _playerService: PlayerService) {}
}
