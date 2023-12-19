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
import { TelevisionConfiguration } from '@media-library/ml-data';
import { TelevisionConfigurationEditorComponent } from '../television-configuration-editor/television-configuration-editor.component';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ml-television-configuration',
  templateUrl: './television-configuration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TelevisionConfigurationComponent implements OnInit, OnChanges {
  @Input({required: true }) public configuration!: TelevisionConfiguration;
  public faPenToSquare = faPenToSquare;
  private _editorRef?: ModalRef<TelevisionConfigurationEditorComponent>;

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

  private _setData(configuration: TelevisionConfiguration): void {
  }

  public showTelevisionConfigurationEditor(): void {
    const modalConfig = new ModalConfig<TelevisionConfigurationEditorComponent>();

    modalConfig.configureComponentInputs = component => {
      component.configuration = this.configuration;
    };
    this._editorRef = this._modalService.showComponent(TelevisionConfigurationEditorComponent, modalConfig);
  }
}
