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
import { MediaLibraryConfiguration } from '@media-library/ml-data';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { MediaLibraryConfigurationEditorComponent } from '../media-library-configuration-editor/media-library-configuration-editor.component';

@Component({
  selector: 'ml-media-library-configuration',
  templateUrl: './media-library-configuration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaLibraryConfigurationComponent implements OnInit, OnChanges {
  @Input({required: true }) public configuration!: MediaLibraryConfiguration;
  public faPenToSquare = faPenToSquare;
  private _editorRef?: ModalRef<MediaLibraryConfigurationEditorComponent>;

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

  private _setData(configuration: MediaLibraryConfiguration): void {
  }

  public showMediaLibraryConfigurationEditor(): void {
    const modalConfig = new ModalConfig<MediaLibraryConfigurationEditorComponent>();

    modalConfig.configureComponentInputs = component => {
      component.configuration = this.configuration;
    };
    this._editorRef = this._modalService.showComponent(MediaLibraryConfigurationEditorComponent, modalConfig);
  }
}
