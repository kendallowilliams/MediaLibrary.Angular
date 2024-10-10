import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { PlayerConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-player-page',
  templateUrl: './app-player-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlayerPageComponent {
  @HostBinding('class') private _class = 'block h-full';

  private _configuration?: PlayerConfiguration;
}
