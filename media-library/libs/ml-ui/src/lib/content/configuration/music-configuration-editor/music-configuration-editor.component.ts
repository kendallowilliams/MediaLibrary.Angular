import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { 
  AlbumSort, 
  ArtistSort, 
  ConfigurationsActions, 
  ConfigurationsState, 
  MusicConfiguration, 
  SongSort, 
  getAlbumSortEnumString, 
  getArtistSortEnumString, 
  getSongSortEnumString 
} from '@media-library/ml-data';
import { SelectOption } from '../../../controls/select';
import { ModalRef } from '../../../modal';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ml-music-configuration-editor',
  templateUrl: './music-configuration-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicConfigurationEditorComponent implements OnInit {
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

  public albumSort?: AlbumSort;
  public artistSort?: ArtistSort;
  public songSort?: SongSort;
  
  constructor(
    private _modalRef: ModalRef<MusicConfigurationEditorComponent>,
    private _store: Store<ConfigurationsState>
  ) { }
  
  public ngOnInit(): void {
    this.albumSort = this.configuration.selectedAlbumSort;
    this.artistSort = this.configuration.selectedArtistSort;
    this.songSort = this.configuration.selectedSongSort;
  }

  public handleSave(): void {
    const configuration = structuredClone(this.configuration, {});

    configuration.selectedAlbumSort = this.albumSort || this.configuration.selectedAlbumSort;
    configuration.selectedArtistSort = this.artistSort || this.configuration.selectedArtistSort;
    configuration.selectedSongSort = this.songSort || this.configuration.selectedSongSort;
    this._store.dispatch(ConfigurationsActions.updateMusicConfiguration({ configuration }));
    this._modalRef?.hide();
  }
}
