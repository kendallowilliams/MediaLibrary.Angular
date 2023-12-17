import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MusicConfiguration, MusicService } from '@media-library/ml-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent implements OnInit {
  public configuration$?: Observable<MusicConfiguration>;

  constructor(private _musicService: MusicService) {}

  public ngOnInit(): void {
    this.configuration$ = this._musicService.getConfiguration();
  }
}
