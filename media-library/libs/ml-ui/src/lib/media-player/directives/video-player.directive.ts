import { Directive, ElementRef } from "@angular/core";
import { PlayerService } from "../services/player.service";

@Directive({
  selector: 'video[mlVideoPlayer]'
})
export class VideoPlayerDirective {
  constructor(private _elementRef: ElementRef<HTMLVideoElement>, private _playerService: PlayerService) {
    this._playerService.video = this._elementRef;
  }
}