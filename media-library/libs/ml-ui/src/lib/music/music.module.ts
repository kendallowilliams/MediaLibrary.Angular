import { NgModule } from "@angular/core";
import { SongsComponent } from "./song/songs.component";
import { CommonModule } from "@angular/common";
import { ArtistComponent } from "./artist/artist.component";
import { AlbumComponent } from "./album/album.component";
import { ButtonModule, ControlsModule, SelectModule } from "../controls";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditSongModalComponent } from './modals/edit-song-modal/edit-song-modal.component';
import { ModalModule } from "../modal";
import { CardModule } from "../controls/card/card.module";
import { TextBoxDirective } from "../controls/text-box/directives/text-box.directive";
import { AddToPlaylistModalComponent } from "./modals/add-to-playlist-modal/add-to-playlist-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListBoxModule } from "../controls/list-box";

@NgModule({
  exports: [
    SongsComponent, 
    ArtistComponent, 
    AlbumComponent, 
    EditSongModalComponent, 
    AddToPlaylistModalComponent
  ],
  declarations: [
    SongsComponent, 
    ArtistComponent, 
    AlbumComponent,
    EditSongModalComponent, 
    AddToPlaylistModalComponent
  ],
  imports: [
    CommonModule, 
    ButtonModule, 
    FontAwesomeModule, 
    ModalModule, 
    CardModule, 
    ControlsModule, 
    TextBoxDirective,
    FormsModule,
    ReactiveFormsModule,
    ListBoxModule,
    SelectModule
  ]
})
export class MusicModule {}