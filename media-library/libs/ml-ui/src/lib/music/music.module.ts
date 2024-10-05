import { NgModule } from "@angular/core";
import { SongsGridComponent } from "./song/songs-grid.component";
import { CommonModule } from "@angular/common";
import { ArtistComponent } from "./artist/artist.component";
import { AlbumComponent } from "./album/album.component";
import { AgGridAngular } from "ag-grid-angular";

@NgModule({
  exports: [SongsGridComponent, ArtistComponent, AlbumComponent],
  declarations: [SongsGridComponent, ArtistComponent, AlbumComponent],
  imports: [CommonModule, AgGridAngular]
})
export class MusicModule {
}