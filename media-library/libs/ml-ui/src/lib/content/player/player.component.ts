import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PlayerConfiguration, PlayerService } from '@media-library/ml-data';

@Component({
  selector: 'ml-player',
  templateUrl: './player.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {
  private _configuration?: PlayerConfiguration;

  constructor(private _playerService: PlayerService) {}
  
  public ngOnInit(): void {
    this._playerService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
}
