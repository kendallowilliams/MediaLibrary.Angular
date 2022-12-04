import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { PodcastService } from '@media-library/ml-data';

@Component({
  selector: 'ml-podcast',
  templateUrl: './podcast.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastComponent {
  constructor(private _podcastService: PodcastService) {}
}
