import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Album, Artist } from '@media-library/ml-data';

@Component({
  selector: 'ml-album',
  templateUrl: './album.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AlbumComponent {
  @Input({required: true}) public album!: Album;
  @Input({required: true}) public artist?: Artist;
}
