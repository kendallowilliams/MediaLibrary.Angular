import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MusicService, MusicConfiguration } from '@media-library/ml-data';

@Component({
  selector: 'ml-music',
  templateUrl: './music.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MusicComponent implements OnInit {
  private _configuration?: MusicConfiguration;

  constructor(private _musicService: MusicService) {
    this._musicService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
  
  public ngOnInit(): void {
    this._musicService.getConfiguration()
      .subscribe(config => this._configuration = config);
  }
}
