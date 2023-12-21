import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PlaylistConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-playlist',
  templateUrl: './app-playlist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaylistComponent {
  private _configuration?: PlaylistConfiguration;
}
