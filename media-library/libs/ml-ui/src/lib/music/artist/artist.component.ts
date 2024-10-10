import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Artist } from '@media-library/ml-data';

@Component({
  selector: 'ml-artist',
  templateUrl: './artist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistComponent {
  @Input({required: true}) public artist!: Artist;
}
