import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MusicConfiguration, getAlbumSortEnumString, getArtistSortEnumString, getSongSortEnumString } from '@media-library/ml-data';
import { faPenToSquare, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'ml-music-configuration',
  templateUrl: './music-configuration.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MusicConfigurationComponent implements OnInit, OnChanges {
  @Input({required: true }) public configuration!: MusicConfiguration;
  public albumSort = '';
  public artistSort = '';
  public songSort = '';
  public faPenToSquare = faPenToSquare;
  public faSpinner = faSpinner;
  public faFolderOpen = faFolderOpen;
  public isDirectorySelectorModalOpen = false;
  public isConfigurationEditorOpen = false;
  public editConfigurationState!: MusicConfiguration;
  public selectedMusicPath?: string;

  public ngOnInit(): void {
    this._setData(this.configuration);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('configuration' in changes) {
      const config = changes['configuration'].currentValue;

      this._setData(config);
    }
  }

  private _setData(configuration: MusicConfiguration): void {
    this.editConfigurationState = Object.assign({}, this.configuration);
    this.albumSort = getAlbumSortEnumString(configuration.selectedAlbumSort);
    this.songSort = getSongSortEnumString(configuration.selectedSongSort);
    this.artistSort = getArtistSortEnumString(configuration.selectedArtistSort);
  }

  public showConfigurationEditor(): void {
    this.editConfigurationState = Object.assign({}, this.configuration);
    this.isConfigurationEditorOpen = true;
  }

  public showDirectorySelectorModal(musicPath: string): void {
    this.selectedMusicPath = musicPath;
    this.isConfigurationEditorOpen = false;
    this.isDirectorySelectorModalOpen = true;
  }

  public handleRefresh() {
    //TODO
  }

  public handleUpload() {
    //TODO
  }
}
