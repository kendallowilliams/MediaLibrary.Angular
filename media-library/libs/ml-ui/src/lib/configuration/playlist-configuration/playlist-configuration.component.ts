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
import { PlaylistConfiguration, getPlaylistSortEnumString, getPodcastFilterEnumString, getPodcastSortEnumString } from '@media-library/ml-data';
import { PlaylistConfigurationEditorComponent } from '../playlist-configuration-editor/playlist-configuration-editor.component';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-playlist-configuration',
  templateUrl: './playlist-configuration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistConfigurationComponent implements OnInit, OnChanges {
  @Input({required: true }) public configuration!: PlaylistConfiguration;
  public faPenToSquare = faPenToSquare;
  private _editorRef?: ModalRef<PlaylistConfigurationEditorComponent>;

  public podcastSort = '';
  public televisionSort = '';
  public musicSort = '';

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

  private _setData(configuration: PlaylistConfiguration): void {
    this.podcastSort = getPlaylistSortEnumString(configuration.selectedPodcastPlaylistSort);
    this.televisionSort = getPlaylistSortEnumString(configuration.selectedTelevisionPlaylistSort);
    this.musicSort = getPlaylistSortEnumString(configuration.selectedMusicPlaylistSort);
  }

  public showPlaylistConfigurationEditor(): void {
    const modalConfig = new ModalConfig();

    modalConfig.inputs = { 'configuration': this.configuration };
    this._editorRef = this._modalService.showComponent(PlaylistConfigurationEditorComponent, modalConfig);
  }
}
