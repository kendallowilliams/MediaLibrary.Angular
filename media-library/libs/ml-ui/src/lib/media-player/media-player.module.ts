import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MediaPlayerComponent } from "./media-player.component";
import { PlayerControlsComponent } from "./player-controls/player-controls.component";
import { AudioPlayerDirective } from "./directives/audio-player.directive";
import { VideoPlayerDirective } from "./directives/video-player.directive";

@NgModule({
  exports: [
    MediaPlayerComponent,
    PlayerControlsComponent,
    AudioPlayerDirective,
    VideoPlayerDirective
  ],
  declarations: [
    MediaPlayerComponent,
    PlayerControlsComponent,
    AudioPlayerDirective,
    VideoPlayerDirective
  ],
  imports: [
    CommonModule
  ]
})
export class MediaPlayerModule {
}