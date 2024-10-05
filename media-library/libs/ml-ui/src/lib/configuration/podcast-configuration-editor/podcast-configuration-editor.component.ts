import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { 
  ConfigurationsActions, 
  PodcastConfiguration
} from '@media-library/ml-data';
import { ModalRef } from '../../modal';
import { Store } from '@ngrx/store';
import { MlDataFeatureState } from '@media-library/ml-data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ml-podcast-configuration-editor',
  templateUrl: './podcast-configuration-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastConfigurationEditorComponent implements OnInit {
  @Input({ required: true }) public configuration!: PodcastConfiguration;

  public configForm!: FormGroup;
  
  constructor(
    private _modalRef: ModalRef<PodcastConfigurationEditorComponent>,
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

    this._store.dispatch(ConfigurationsActions.updatePodcastConfiguration({ configuration }));
    this._modalRef?.hide();
  }

  public handleCancel(): void {
    this._modalRef?.hide();
  }
}
