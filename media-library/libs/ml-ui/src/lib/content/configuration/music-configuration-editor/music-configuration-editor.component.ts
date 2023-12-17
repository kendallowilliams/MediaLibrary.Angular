import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { AlbumSort, ArtistSort, MusicConfiguration, MusicService, SongSort, getAlbumSortEnumString, getArtistSortEnumString, getSongSortEnumString } from '@media-library/ml-data';
import { SelectOption } from '../../../controls/select';
import { ModalRef } from '../../../modal';

@Component({
  selector: 'ml-music-configuration-editor',
  templateUrl: './music-configuration-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicConfigurationEditorComponent {
  @Input({ required: true }) public configuration!: MusicConfiguration;
  
  public albumSortOptions: SelectOption[] = [{
    text: getAlbumSortEnumString(AlbumSort.AtoZ),
    value: AlbumSort.AtoZ
  }];
  public artistSortOptions: SelectOption[] = [{
    text: getArtistSortEnumString(ArtistSort.AtoZ),
    value: ArtistSort.AtoZ
  }];
  public songSortOptions: SelectOption[] = [{
    text: getSongSortEnumString(SongSort.Album),
    value: SongSort.Album
  },{
    text: getSongSortEnumString(SongSort.Artist),
    value: SongSort.Artist
  },{
    text: getSongSortEnumString(SongSort.AtoZ),
    value: SongSort.AtoZ
  },{
    text: getSongSortEnumString(SongSort.DateAdded),
    value: SongSort.DateAdded
  },{
    text: getSongSortEnumString(SongSort.Genre),
    value: SongSort.Genre
  }];
  
  constructor(
    private _api: MusicService,
    private _modalRef: ModalRef<MusicConfigurationEditorComponent>) { }

  public handleSave(): void {
    this._modalRef?.hide();
  }
}
