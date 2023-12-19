import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ModalConfig, ModalRef, ModalService } from '../../../modal';
import { PodcastConfiguration } from '@media-library/ml-data';
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
  }

  public showPodcastConfigurationEditor(): void {
    const modalConfig = new ModalConfig<PodcastConfigurationEditorComponent>();

    modalConfig.configureComponentInputs = component => {
      component.configuration = this.configuration;
    };
    this._editorRef = this._modalService.showComponent(PodcastConfigurationEditorComponent, modalConfig);
  }
}
