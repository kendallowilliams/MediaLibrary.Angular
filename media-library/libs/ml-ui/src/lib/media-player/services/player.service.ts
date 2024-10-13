import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable } from "rxjs";
import { APP_ENVIRONMENT, Environment, getMediaPagesEnumString, MediaPages } from '@media-library/ml-data';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly _video: HTMLVideoElement = document.createElement('video');
  private readonly _audio: HTMLAudioElement = document.createElement('audio');
  private _isPlayerVisible$ = new BehaviorSubject<boolean>(false);

  public get video() : HTMLVideoElement {
    return this._video;
  }

  public get audio() : HTMLAudioElement {
    return this._audio;
  }

  constructor(@Inject(APP_ENVIRONMENT) private _environment: Environment) {}

  public getIsPlayerVisible(): Observable<boolean> {
    return this._isPlayerVisible$.asObservable();
  }

  public setIsPlayerVisible(isVisible: boolean): void {
    this._isPlayerVisible$.next(isVisible);
  }

  public playAudio(type: MediaPages, ...ids: number[]) : Observable<void> {
    const url = `${this._environment.apiBaseUrl}/${getMediaPagesEnumString(type)}/File/${ids}`;
    this._audio.src = url;
    return from(this._audio.play());
  }

  public playVideo(...ids: number[]) : Observable<void> {
    return from(this._video.play());
  }
}