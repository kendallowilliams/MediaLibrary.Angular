import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Artist } from '@media-library/ml-data';

@Component({
  selector: 'app-artist',
  templateUrl: './app-artist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppArtistComponent {
  @Input() public artist?: Artist | null;
}
