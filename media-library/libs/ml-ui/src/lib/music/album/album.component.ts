import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Album } from '@media-library/ml-data';

@Component({
  selector: 'ml-album',
  templateUrl: './album.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlbumComponent {
  @Input({required: true}) public album!: Album;
}
