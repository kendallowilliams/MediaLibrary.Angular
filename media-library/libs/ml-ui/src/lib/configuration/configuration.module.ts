import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicConfigurationComponent } from './music-configuration/music-configuration.component';
import { MusicConfigurationEditorComponent } from './music-configuration/music-configuration-editor/music-configuration-editor.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MediaLibraryConfigurationComponent } from './media-library-configuration/media-library-configuration.component';
import { PlayerConfigurationComponent } from './player-configuration/player-configuration.component';
import { PlaylistConfigurationComponent } from './playlist-configuration/playlist-configuration.component';
import { TelevisionConfigurationComponent } from './television-configuration/television-configuration.component';
import { PodcastConfigurationComponent } from './podcast-configuration/podcast-configuration.component';
import { MediaLibraryConfigurationEditorComponent } from './media-library-configuration-editor/media-library-configuration-editor.component';
import { PlayerConfigurationEditorComponent } from './player-configuration-editor/player-configuration-editor.component';
import { PlaylistConfigurationEditorComponent } from './playlist-configuration-editor/playlist-configuration-editor.component';
import { TelevisionConfigurationEditorComponent } from './television-configuration-editor/television-configuration-editor.component';
import { PodcastConfigurationEditorComponent } from './podcast-configuration-editor/podcast-configuration-editor.component';
import { CardModule, ControlsModule } from '../controls';
import { ModalModule } from '../modal';
import { ListBoxModule } from '../controls/list-box';
import { MusicDirectorySelectorComponent } from './music-configuration/music-directory-selector/music-directory-selector.component';
import { ControlGroupModule } from '../controls/control-group';
import { BreadcrumbBarModule } from '../controls/breadcrumb-bar';

@NgModule({
  declarations: [
    MusicConfigurationComponent,
    MusicConfigurationEditorComponent,
    MediaLibraryConfigurationComponent,
    PlayerConfigurationComponent,
    PlaylistConfigurationComponent,
    TelevisionConfigurationComponent,
    PodcastConfigurationComponent,
    MediaLibraryConfigurationEditorComponent,
    PlayerConfigurationEditorComponent,
    PlaylistConfigurationEditorComponent,
    TelevisionConfigurationEditorComponent,
    PodcastConfigurationEditorComponent,
    MusicDirectorySelectorComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    FontAwesomeModule,
    FormsModule,
    ControlsModule,
    ReactiveFormsModule,
    ModalModule,
    ListBoxModule,
    ControlGroupModule,
    BreadcrumbBarModule
  ],
  exports: [
    MusicConfigurationComponent,
    MusicConfigurationEditorComponent,
    MediaLibraryConfigurationComponent,
    PlayerConfigurationComponent,
    PlaylistConfigurationComponent,
    TelevisionConfigurationComponent,
    PodcastConfigurationComponent,
    MediaLibraryConfigurationEditorComponent,
    PlayerConfigurationEditorComponent,
    PlaylistConfigurationEditorComponent,
    TelevisionConfigurationEditorComponent,
    PodcastConfigurationEditorComponent,
  ]
})
export class ConfigurationModule { }
