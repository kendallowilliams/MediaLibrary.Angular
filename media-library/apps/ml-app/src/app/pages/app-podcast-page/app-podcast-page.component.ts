import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PodcastConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-podcast-page',
  templateUrl: './app-podcast-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPodcastPageComponent {
  private _configuration?: PodcastConfiguration;
}
