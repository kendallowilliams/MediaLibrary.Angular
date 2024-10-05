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
  MusicConfiguration, 
  SongSort, 
  getAlbumSortEnumString, 
  getArtistSortEnumString, 
  getSongSortEnumString 
} from '@media-library/ml-data';
import { SelectOption } from '../../controls/select';
import { ModalRef } from '../../modal';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '@media-library/ml-data';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public configForm!: FormGroup;
  
  constructor(
    private _modalRef: ModalRef<MusicConfigurationEditorComponent>,
    private _store: Store<MlDataFeatureState>,
    private _fb: FormBuilder
  ) { }
  
  public ngOnInit(): void {
    this.configForm = this._createConfigForm();
  }

  private _createConfigForm(): FormGroup {
    return this._fb.group({
      selectedAlbumSort: this._fb.control(this.configuration.selectedAlbumSort, Validators.required),
      selectedArtistSort: this._fb.control(this.configuration.selectedArtistSort, Validators.required),
      selectedSongSort: this._fb.control(this.configuration.selectedSongSort, Validators.required),
      musicPaths: this._fb.control(this.configuration.musicPaths)
    });
  }

  public handleSave(): void {
    const configuration = structuredClone(this.configuration, {});

    configuration.selectedAlbumSort = this.configForm.controls['selectedAlbumSort'].value;
    configuration.selectedArtistSort = this.configForm.controls['selectedArtistSort'].value;
    configuration.selectedSongSort = this.configForm.controls['selectedSongSort'].value;
    configuration.musicPaths = this.configForm.controls['musicPaths'].value;
    this._store.dispatch(ConfigurationsActions.updateMusicConfiguration({ configuration }));
    this._modalRef?.hide();
  }

  public handleCancel(): void {
    this._modalRef?.hide();
  }
}
