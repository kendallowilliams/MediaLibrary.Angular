import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TelevisionConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-television',
  templateUrl: './app-television.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTelevisionComponent {
  private _configuration?: TelevisionConfiguration;
}
