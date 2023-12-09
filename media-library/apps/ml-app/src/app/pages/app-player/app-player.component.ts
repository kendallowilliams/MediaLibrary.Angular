import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { PlayerConfiguration, PlayerService } from '@media-library/ml-data';

@Component({
  selector: 'app-player',
  templateUrl: './app-player.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlayerComponent implements OnInit {
  private _configuration?: PlayerConfiguration;

  constructor(private _playerService: PlayerService) {}
  
  public ngOnInit(): void {
    this._playerService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
}
