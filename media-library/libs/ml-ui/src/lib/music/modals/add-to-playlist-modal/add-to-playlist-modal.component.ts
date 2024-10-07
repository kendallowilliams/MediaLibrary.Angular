import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ListItem, Playlist } from '@media-library/ml-data';

@Component({
  selector: 'ml-add-to-playlist-modal',
  templateUrl: './add-to-playlist-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToPlaylistModalComponent {
  @Input() public playlists: Playlist[] | null = [];
  
  public selectedPlaylists: ListItem<number>[] = [];
}
