import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { 
  ConfigurationsActions, 
  PlayerConfiguration
} from '@media-library/ml-data';
import { ModalRef } from '../../../modal';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '@media-library/ml-data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ml-player-configuration-editor',
  templateUrl: './player-configuration-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerConfigurationEditorComponent implements OnInit {
  @Input({ required: true }) public configuration!: PlayerConfiguration;

  public configForm!: FormGroup;
  
  constructor(
    private _modalRef: ModalRef<PlayerConfigurationEditorComponent>,
    private _store: Store<MlDataFeatureState>,
    private _fb: FormBuilder
  ) { }
  
  public ngOnInit(): void {
    this.configForm = this._createConfigForm();
  }

  private _createConfigForm(): FormGroup {
    return this._fb.group({
    });
  }

  public handleSave(): void {
    const configuration = structuredClone(this.configuration, {});

    this._store.dispatch(ConfigurationsActions.updatePlayerConfiguration({ configuration }));
    this._modalRef?.hide();
  }

  public handleCancel(): void {
    this._modalRef?.hide();
  }
}
