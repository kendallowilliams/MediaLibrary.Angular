import { Directive, ElementRef } from "@angular/core";
import { PlayerService } from "../../services/music/player.service";

@Directive({
  selector: 'audio[mlAudioPlayer]'
})
export class AudioPlayerDirective {
  constructor(private _elementRef: ElementRef<HTMLAudioElement>, private _playerService: PlayerService) {
    this._playerService.setAudio(this._elementRef.nativeElement);
  }
}