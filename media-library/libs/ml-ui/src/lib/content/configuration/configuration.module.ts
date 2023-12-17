import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicConfigurationComponent } from './music-configuration/music-configuration.component';
import { CardModule } from '../card/card.module';
import { SelectModule } from '../../controls/select';
import { MusicConfigurationEditorComponent } from './music-configuration-editor/music-configuration-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from '../../controls/button';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MusicConfigurationComponent,
    MusicConfigurationEditorComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    SelectModule,
    FontAwesomeModule,
    ButtonModule,
    FormsModule
  ],
  exports: [
    MusicConfigurationComponent,
    MusicConfigurationEditorComponent
  ]
})
export class ConfigurationModule { }
