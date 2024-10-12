import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MediaPlayerComponent } from "./media-player.component";
import { PlayerControlsComponent } from "./player-controls/player-controls.component";
import { MlUtilityModule, PlayerService } from "@media-library/ml-utility";

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
    MlUtilityModule
  ],
  providers: [PlayerService]
})
export class MediaPlayerModule {
}