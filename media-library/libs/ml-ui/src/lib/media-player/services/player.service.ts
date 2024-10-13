import { ElementRef, Inject, Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { APP_ENVIRONMENT, Environment, MediaPages, PlayerApiService } from '@media-library/ml-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _video!: ElementRef<HTMLVideoElement>;
  private _audio!: ElementRef<HTMLAudioElement>;
  private _isPlayerVisible$ = new BehaviorSubject<boolean>(false);

  public get video() : HTMLVideoElement {
    return this._video.nativeElement;
  }

  public set video(video: ElementRef<HTMLVideoElement>) {
    this._video = video;
  }

  public get audio() : HTMLAudioElement {
    return this._audio.nativeElement;
  }

  public set audio(audio: ElementRef<HTMLAudioElement>) {
    this._audio = audio;
  }

  constructor(@Inject(APP_ENVIRONMENT) private _environment: Environment, private _playerApiService: PlayerApiService) {}

  public getIsPlayerVisible(): Observable<boolean> {
    return this._isPlayerVisible$.asObservable();
  }

  public setIsPlayerVisible(isVisible: boolean): void {
    this._isPlayerVisible$.next(isVisible);
  }

  public playAudio(type: MediaPages, ...ids: number[]) : Observable<void> {
    this.audio.src = this._playerApiService.getFileUrl(type, ids[0]);
    return from(this.audio.play());
  }

  public playVideo(...ids: number[]) : Observable<void> {
    return from(this.video.play());
  }
}