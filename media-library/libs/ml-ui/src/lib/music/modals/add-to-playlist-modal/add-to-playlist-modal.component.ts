import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { AddSongToPlaylistsRequest, ListItem, Playlist, Track } from '@media-library/ml-data';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalRef } from '../../../modal';

@Component({
  selector: 'ml-add-to-playlist-modal',
  templateUrl: './add-to-playlist-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToPlaylistModalComponent implements OnChanges {
  @Input() public playlists: Playlist[] | null = [];
  @Input() public selectedPlaylistIds: number[] | null = [];
  @Input({ required: true }) public song: Track | null = null;
  @Output() public selectedPlaylistIdsChange = new EventEmitter<AddSongToPlaylistsRequest>();

  public playlistItems: ListItem<number>[] = [];
  public faPlus = faPlus;

  constructor(private _modalRef: ModalRef<AddSongToPlaylistsRequest>) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if ('playlists' in changes) {
      this.playlistItems = this.playlists?.map(playlist => ({
        name: playlist.name,
        value: playlist.id
      })) || [];
    }
  }

  public handleSave(values: number[]) : void {
      if (this.song && values) {
      this.selectedPlaylistIdsChange.emit({
        songId: this.song?.id,
        playlistIds: values
      });
      this._modalRef.hide();
    }
  }
}
