import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfigurationsActions, ConfigurationsState, MlDataFeatureState, selectAllConfigurations } from '@media-library/ml-data';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './app-settings.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppSettingsComponent implements OnInit {
  public configurations$?: Observable<ConfigurationsState | undefined>;

  constructor(private _store: Store<MlDataFeatureState>) {}

  public ngOnInit(): void {
    this._store.dispatch(ConfigurationsActions.loadMusicConfiguration());
    this._store.dispatch(ConfigurationsActions.loadMediaLibraryConfiguration());
    this._store.dispatch(ConfigurationsActions.loadPodcastConfiguration());
    this._store.dispatch(ConfigurationsActions.loadPlayerConfiguration());
    this._store.dispatch(ConfigurationsActions.loadPlaylistConfiguration());
    this._store.dispatch(ConfigurationsActions.loadTelevisionConfiguration());
    this.configurations$ = this._store.select(selectAllConfigurations);
  }
}
