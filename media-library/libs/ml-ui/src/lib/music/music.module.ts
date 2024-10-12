import { NgModule } from "@angular/core";
import { SongsGridComponent } from "./song/songs-grid.component";
import { CommonModule } from "@angular/common";
import { ArtistComponent } from "./artist/artist.component";
import { AlbumComponent } from "./album/album.component";
import { AgGridAngular } from "@ag-grid-community/angular";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SongOptionsCellRendererComponent } from './cell-renderers/song-options-cell-renderer/song-options-cell-renderer.component';
import { ButtonModule, ControlsModule } from "../controls";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { EditSongModalComponent } from './modals/edit-song-modal/edit-song-modal.component';
import { ModalModule } from "../modal";
import { CardModule } from "../controls/card/card.module";
import { TextBoxDirective } from "../controls/text-box/directives/text-box.directive";
import { AddToPlaylistModalComponent } from "./modals/add-to-playlist-modal/add-to-playlist-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";

@NgModule({
  exports: [
    SongsGridComponent, 
    ArtistComponent, 
    AlbumComponent, 
    EditSongModalComponent, 
    AddToPlaylistModalComponent
  ],
  declarations: [
    SongsGridComponent, 
    ArtistComponent, 
    AlbumComponent, 
    SongOptionsCellRendererComponent, 
    EditSongModalComponent, 
    AddToPlaylistModalComponent
  ],
  imports: [
    CommonModule, 
    AgGridAngular, 
    ButtonModule, 
    FontAwesomeModule, 
    ModalModule, 
    CardModule, 
    ControlsModule, 
    TextBoxDirective,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MusicModule {
  constructor() {
    ModuleRegistry.registerModules([
      ClientSideRowModelModule, 
      RowGroupingModule, 
      FiltersToolPanelModule, 
      SetFilterModule,
      MenuModule
    ]);
  }
}