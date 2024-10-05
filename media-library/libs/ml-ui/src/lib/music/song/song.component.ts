import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Track } from '@media-library/ml-data';

@Component({
  selector: 'ml-song',
  templateUrl: './song.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SongComponent {
  @Input({required: true}) public song!: Track;
}
