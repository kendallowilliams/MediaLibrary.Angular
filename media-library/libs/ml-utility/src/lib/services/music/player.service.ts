import { Injectable } from "@angular/core";
import { from, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _video!: HTMLVideoElement;
  private _audio!: HTMLAudioElement;

  public setVideo(video: HTMLVideoElement) : void {
    this._video = video;
  }

  public setAudio(audio: HTMLAudioElement) : void {
    this._audio = audio;
  }

  public playAudio(...ids: number[]) : Observable<void> {
    return from(this._audio.play());
  }

  public playVideo(...ids: number[]) : Observable<void> {
    return from(this._video.play());
  }
}