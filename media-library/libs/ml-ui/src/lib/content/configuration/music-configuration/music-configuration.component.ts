import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ModalConfig, ModalRef, ModalService } from '../../../modal';
import { MusicConfiguration, getAlbumSortEnumString, getArtistSortEnumString, getSongSortEnumString } from '@media-library/ml-data';
import { MusicConfigurationEditorComponent } from '../music-configuration-editor/music-configuration-editor.component';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-music-configuration',
  templateUrl: './music-configuration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicConfigurationComponent implements OnInit {
  @Input({required: true }) public configuration!: MusicConfiguration;
  public albumSort = '';
  public artistSort = '';
  public songSort = '';
  public faPenToSquare = faPenToSquare;
  private _editorRef?: ModalRef<MusicConfigurationEditorComponent>;

  constructor(private _modalService: ModalService) {}

  public ngOnInit(): void {
    this.albumSort = getAlbumSortEnumString(this.configuration.selectedAlbumSort);
    this.songSort = getSongSortEnumString(this.configuration.selectedSongSort);
    this.artistSort = getArtistSortEnumString(this.configuration.selectedArtistSort);
  }

  public showMusicConfigurationEditor(): void {
    const modalConfig = new ModalConfig<MusicConfigurationEditorComponent>();

    modalConfig.configureComponentInputs = component => {
      component.configuration = this.configuration;
    };
    this._editorRef = this._modalService.showComponent(MusicConfigurationEditorComponent, modalConfig);
  }
}
