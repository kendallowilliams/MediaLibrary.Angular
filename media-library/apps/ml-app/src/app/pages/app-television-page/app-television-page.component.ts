import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TelevisionConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-television-page',
  templateUrl: './app-television-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTelevisionPageComponent {
  private _configuration?: TelevisionConfiguration;
}
