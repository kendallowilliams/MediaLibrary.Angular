import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './directives/theme.directive';
import { AudioPlayerDirective } from './directives/player/audio-player.directive';
import { VideoPlayerDirective } from './directives/player/video-player.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ThemeDirective, AudioPlayerDirective, VideoPlayerDirective],
  exports: [ThemeDirective, AudioPlayerDirective, VideoPlayerDirective]
})
export class MlUtilityModule {}
