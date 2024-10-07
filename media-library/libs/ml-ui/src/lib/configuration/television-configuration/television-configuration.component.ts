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
import { TelevisionConfiguration, getSeriesSortEnumString } from '@media-library/ml-data';
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

  public seriesSort = '';

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
    this.seriesSort = getSeriesSortEnumString(configuration.selectedSeriesSort);
  }

  public showTelevisionConfigurationEditor(): void {
    const modalConfig = new ModalConfig();

    modalConfig.inputs = { 'configuration': this.configuration };
    this._editorRef = this._modalService.showComponent(TelevisionConfigurationEditorComponent, modalConfig);
  }

  public handleRefresh(): void {

  }
}
