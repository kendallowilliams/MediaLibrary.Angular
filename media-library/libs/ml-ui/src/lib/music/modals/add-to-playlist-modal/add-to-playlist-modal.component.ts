import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ListItem, Playlist } from '@media-library/ml-data';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-add-to-playlist-modal',
  templateUrl: './add-to-playlist-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToPlaylistModalComponent implements OnChanges {
  @Input() public playlists: Playlist[] | null = [];
  @Input() public selectedPlaylistIds: number[] | null = [];
  @Output() public selectedPlaylistIdsChange = new EventEmitter<number[]>();

  public playlistItems: ListItem<number>[] = [];
  public faPlus = faPlus;

  public ngOnChanges(changes: SimpleChanges): void {
    if ('playlists' in changes) {
      this.playlistItems = this.playlists?.map(playlist => ({
        name: playlist.name,
        value: playlist.id
      })) || [];
    }
  }

  public handleListBoxChange(values: number[]) : void {
    this.selectedPlaylistIdsChange.emit(values);
  }
}
