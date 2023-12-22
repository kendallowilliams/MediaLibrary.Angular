import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PlaylistConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './app-playlist-page.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPlaylistPageComponent {
  private _configuration?: PlaylistConfiguration;
}
