import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Artist } from '@media-library/ml-data';

@Component({
    selector: 'ml-artist',
    templateUrl: './artist.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ArtistComponent {
  @Input({required: true}) public artist!: Artist;
}
