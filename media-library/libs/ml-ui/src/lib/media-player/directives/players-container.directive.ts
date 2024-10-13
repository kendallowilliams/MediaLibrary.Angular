import { DestroyRef, Directive, ElementRef, Renderer2 } from "@angular/core";
import { PlayerService } from "../services/player.service";

@Directive({
  selector: '[mlPlayersContainer]'
})
export class PlayersContainerDirective {
  constructor(
    private _host: ElementRef<HTMLAudioElement>, 
    private _playerService: PlayerService,
    private _renderer: Renderer2,
    private _destroyRef: DestroyRef
  ) {}

  public appendPlayers() : void {
    const host = this._host.nativeElement;
    this._renderer.appendChild(host, this._playerService.video);
    this._renderer.appendChild(host, this._playerService.audio);
  }

  public removePlayers() : void {
    const host = this._host.nativeElement;
    this._renderer.removeChild(host, this._playerService.video);
    this._renderer.removeChild(host, this._playerService.audio);
  }
}