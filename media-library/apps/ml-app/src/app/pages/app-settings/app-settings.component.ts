import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigurationsActions, ConfigurationsState, MusicConfiguration, selectMusicConfiguration } from '@media-library/ml-data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSettingsComponent implements OnInit {
  public configuration$?: Observable<MusicConfiguration | undefined>;

  constructor(private _store: Store<ConfigurationsState>) {}

  public ngOnInit(): void {
    this._store.dispatch(ConfigurationsActions.loadMusicConfiguration());
    this.configuration$ = this._store.select(selectMusicConfiguration);
  }
}
