import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Artist } from '@media-library/ml-data';

@Component({
  selector: 'ml-artist',
  templateUrl: './artist.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistComponent {
  @Input({required: true}) public artist!: Artist;
  @Output() public artistSelect = new EventEmitter<number>();

  public handleArtistClick(id: number) : void {
    this.artistSelect.emit(id);
  }
}
