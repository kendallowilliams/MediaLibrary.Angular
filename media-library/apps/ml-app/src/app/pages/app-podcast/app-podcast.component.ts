import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PodcastConfiguration, PodcastService } from '@media-library/ml-data';

@Component({
  selector: 'app-podcast',
  templateUrl: './app-podcast.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPodcastComponent implements OnInit {
  private _configuration?: PodcastConfiguration;

  constructor(private _podcastService: PodcastService) {}
  
  public ngOnInit(): void {
    this._podcastService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
}
