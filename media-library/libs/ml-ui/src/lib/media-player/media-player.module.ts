import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MediaPlayerComponent } from "./media-player.component";
import { PlayerControlsComponent } from "./player-controls/player-controls.component";
import { PlayerService } from "./services/player.service";

@NgModule({
  exports: [
    MediaPlayerComponent,
    PlayerControlsComponent
  ],
  declarations: [
    MediaPlayerComponent,
    PlayerControlsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [PlayerService]
})
export class MediaPlayerModule {
}