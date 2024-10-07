import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ModalConfig, ModalRef, ModalService } from '../../modal';
import { MusicConfiguration, getAlbumSortEnumString, getArtistSortEnumString, getSongSortEnumString } from '@media-library/ml-data';
import { MusicConfigurationEditorComponent } from '../music-configuration-editor/music-configuration-editor.component';
import { faPenToSquare, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-music-configuration',
  templateUrl: './music-configuration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicConfigurationComponent implements OnInit, OnChanges {
  @Input({required: true }) public configuration!: MusicConfiguration;
  public albumSort = '';
  public artistSort = '';
  public songSort = '';
  public faPenToSquare = faPenToSquare;
  public faSpinner = faSpinner;
  private _editorRef?: ModalRef<MusicConfigurationEditorComponent>;

  constructor(private _modalService: ModalService) {}

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
    this.albumSort = getAlbumSortEnumString(configuration.selectedAlbumSort);
    this.songSort = getSongSortEnumString(configuration.selectedSongSort);
    this.artistSort = getArtistSortEnumString(configuration.selectedArtistSort);
  }

  public showMusicConfigurationEditor(): void {
    const modalConfig = new ModalConfig();

    modalConfig.inputs = { 'configuration': this.configuration };
    this._editorRef = this._modalService.showComponent(MusicConfigurationEditorComponent, modalConfig);
  }

  public handleRefresh() {
  }

  public handleUpload() {
  }
}
