import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PodcastConfiguration, PodcastService } from '@media-library/ml-data';

@Component({
  selector: 'ml-podcast',
  templateUrl: './podcast.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastComponent implements OnInit {
  private _configuration?: PodcastConfiguration;

  constructor(private _podcastService: PodcastService) {}
  
  public ngOnInit(): void {
    this._podcastService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
}
