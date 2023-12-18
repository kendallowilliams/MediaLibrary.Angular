import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicConfigurationComponent } from './music-configuration/music-configuration.component';
import { CardModule } from '../card/card.module';
import { MusicConfigurationEditorComponent } from './music-configuration-editor/music-configuration-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ControlsModule } from '../../controls';

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
    ControlsModule
  ],
  exports: [
    MusicConfigurationComponent,
    MusicConfigurationEditorComponent
  ]
})
export class ConfigurationModule { }
