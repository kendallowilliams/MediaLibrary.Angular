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
import { PodcastConfiguration, getPodcastFilterEnumString, getPodcastSortEnumString } from '@media-library/ml-data';
import { PodcastConfigurationEditorComponent } from '../podcast-configuration-editor/podcast-configuration-editor.component';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-podcast-configuration',
  templateUrl: './podcast-configuration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastConfigurationComponent implements OnInit, OnChanges {
  @Input({required: true }) public configuration!: PodcastConfiguration;
  public faPenToSquare = faPenToSquare;
  private _editorRef?: ModalRef<PodcastConfigurationEditorComponent>;

  public podcastSort = '';
  public episodeFilter = '';

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

  private _setData(configuration: PodcastConfiguration): void {
    this.podcastSort = getPodcastSortEnumString(configuration.selectedPodcastSort);
    this.episodeFilter = getPodcastFilterEnumString(configuration.selectedPodcastFilter)
  }

  public showPodcastConfigurationEditor(): void {
    const modalConfig = new ModalConfig();

    modalConfig.inputs = { 'configuration': this.configuration };
    this._editorRef = this._modalService.showComponent(PodcastConfigurationEditorComponent, modalConfig);
  }

  public handleAdd() : void {
  }

  public handleRefresh(): void {
  }
}
