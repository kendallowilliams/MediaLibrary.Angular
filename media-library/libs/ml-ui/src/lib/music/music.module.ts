import { NgModule } from "@angular/core";
import { SongComponent } from "./song/song.component";
import { CommonModule } from "@angular/common";
import { ArtistComponent } from "./artist/artist.component";
import { AlbumComponent } from "./album/album.component";

@NgModule({
  exports: [SongComponent, ArtistComponent, AlbumComponent],
  declarations: [SongComponent, ArtistComponent, AlbumComponent],
  imports: [CommonModule]
})
export class MusicModule {
}