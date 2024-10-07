import { createAction, props } from '@ngrx/store';
import { Playlist } from '../../models/playlist/playlist.model';

export class PlaylistsActions {
  public static loadPlaylists = createAction('[Playlists/API] Load Playlists');
  public static loadPlaylistsSuccess = createAction(
    '[Playlists/API] Load Playlists Success',
    props<{ playlists: Playlist[] }>(),
  );
  public static loadPlaylistsFailure = createAction(
    '[Playlists/API] Load Playlists Failure',
    props<{ error: string }>(),
  );
}

