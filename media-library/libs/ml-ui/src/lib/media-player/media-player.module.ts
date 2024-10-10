import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MediaPlayerComponent } from "./media-player.component";
import { PlayerControlsComponent } from "./player-controls/player-controls.component";

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
    CommonModule, 
  ]
})
export class MediaPlayerModule {
}