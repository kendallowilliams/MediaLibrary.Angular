import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicConfigurationComponent } from './music-configuration/music-configuration.component';
import { CardModule } from '../card/card.module';
import { MusicConfigurationEditorComponent } from './music-configuration-editor/music-configuration-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlsModule } from '../../controls';
import { ModalModule } from '../../modal';

@NgModule({
  declarations: [
    MusicConfigurationComponent,
    MusicConfigurationEditorComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    FontAwesomeModule,
    FormsModule,
    ControlsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  exports: [
    MusicConfigurationComponent,
    MusicConfigurationEditorComponent
  ]
})
export class ConfigurationModule { }
