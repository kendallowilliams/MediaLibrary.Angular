import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { PlayerConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-player-page',
  templateUrl: './app-player-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlayerPageComponent {
  private _configuration?: PlayerConfiguration;
}
