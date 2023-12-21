import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PodcastConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-podcast',
  templateUrl: './app-podcast.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPodcastComponent {
  private _configuration?: PodcastConfiguration;
}
