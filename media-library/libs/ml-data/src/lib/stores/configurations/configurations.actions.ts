import { createAction, props } from '@ngrx/store';
import { MusicConfiguration } from '../../models/configurations/MusicConfiguration.interface';

export class ConfigurationsActions {
  public static loadMusicConfiguration = createAction('[Configurations/API] Load Music Configuration');
  public static loadMusicConfigurationSuccess = createAction(
    '[Configurations/API] Load Music Configuration Success',
    props<{ configuration: MusicConfiguration }>(),
  );

  public static loadMusicConfigurationFailure = createAction(
    '[Configurations/API] Load Music Configuration Failure',
    props<{ error: any }>(),
  );
  public static updateMusicConfiguration = createAction('[Configurations/API] Update Music Configuration', 
    props<{ configuration: MusicConfiguration }>()
  );
  public static updateMusicConfigurationSuccess = createAction(
    '[Configurations/API] Update Music Configuration Success',
    props<{ configuration: MusicConfiguration }>(),
  );

  public static updateMusicConfigurationFailure = createAction(
    '[Configurations/API] Update Music Configuration Failure',
    props<{ error: any }>(),
  );
}

