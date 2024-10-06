import { NgModule } from "@angular/core";
import { SongsGridComponent } from "./song/songs-grid.component";
import { CommonModule } from "@angular/common";
import { ArtistComponent } from "./artist/artist.component";
import { AlbumComponent } from "./album/album.component";
import { AgGridAngular } from "@ag-grid-community/angular";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SongOptionsCellRendererComponent } from './cell-renderers/song-options-cell-renderer/song-options-cell-renderer.component';
import { ButtonModule } from "../controls";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  exports: [SongsGridComponent, ArtistComponent, AlbumComponent],
  declarations: [SongsGridComponent, ArtistComponent, AlbumComponent, SongOptionsCellRendererComponent],
  imports: [CommonModule, AgGridAngular, ButtonModule, FontAwesomeModule]
})
export class MusicModule {
  constructor() {
    ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);
  }
}