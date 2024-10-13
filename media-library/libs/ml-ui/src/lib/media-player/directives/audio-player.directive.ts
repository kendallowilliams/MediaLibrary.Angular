import { Directive, ElementRef } from "@angular/core";
import { PlayerService } from "../services/player.service";

@Directive({
  selector: 'audio[mlAudioPlayer]'
})
export class AudioPlayerDirective {
  constructor(private _elementRef: ElementRef<HTMLAudioElement>, private _playerService: PlayerService) {
    this._playerService.audio = this._elementRef;
  }
}