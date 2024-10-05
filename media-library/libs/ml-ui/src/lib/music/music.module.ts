import { NgModule } from "@angular/core";
import { SongComponent } from "./song/song.component";
import { CommonModule } from "@angular/common";

@NgModule({
  exports: [SongComponent],
  declarations: [SongComponent],
  imports: [CommonModule]
})
export class MusicModule {
}