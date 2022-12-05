import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { PlaylistConfiguration, PlaylistService } from '@media-library/ml-data';

@Component({
  selector: 'ml-playlist',
  templateUrl: './playlist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistComponent implements OnInit {
  private _configuration?: PlaylistConfiguration;

  constructor(private _playlistService: PlaylistService) {}
  
  public ngOnInit(): void {
    this._playlistService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
}
