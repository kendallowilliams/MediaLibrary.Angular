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
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { PlayerConfiguration } from '@media-library/ml-data';
import { PlayerConfigurationEditorComponent } from '../player-configuration-editor/player-configuration-editor.component';

@Component({
  selector: 'ml-player-configuration',
  templateUrl: './player-configuration.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerConfigurationComponent implements OnInit, OnChanges {
  @Input({required: true }) public configuration!: PlayerConfiguration;
  public faPenToSquare = faPenToSquare;
  private _editorRef?: ModalRef<PlayerConfigurationEditorComponent>;

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

  private _setData(configuration: PlayerConfiguration): void {
  }

  public showPlayerConfigurationEditor(): void {
    const modalConfig = new ModalConfig();

    modalConfig.inputs = { 'configuration': this.configuration };
    this._editorRef = this._modalService.showComponent(PlayerConfigurationEditorComponent, modalConfig);
  }
}
