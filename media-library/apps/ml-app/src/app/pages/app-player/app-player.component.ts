import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { PlayerConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-player',
  templateUrl: './app-player.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlayerComponent {
  private _configuration?: PlayerConfiguration;
}
