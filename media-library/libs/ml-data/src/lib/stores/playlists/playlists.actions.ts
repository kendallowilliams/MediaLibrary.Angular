import { createAction, props } from '@ngrx/store';
import { Playlist } from '../../models/playlist/playlist.model';
import { AddSongToPlaylistsRequest } from '../../models/requests/add-song-to-playlists.request';

export class PlaylistsActions {
  public static loadPlaylists = createAction('[Playlists/API] Load Playlists');
  public static loadPlaylistsSuccess = createAction(
    '[Playlists/API] Load Playlists Success',
    props<{ playlists: Playlist[] }>()
  );
  public static loadPlaylistsFailure = createAction(
    '[Playlists/API] Load Playlists Failure',
    props<{ error: string }>()
  );
  public static addSongToPlaylists = createAction(
    '[Playlists/API] Add Song To Playlists',
    props<AddSongToPlaylistsRequest>()
  );
  public static addSongToPlaylistsSuccess = createAction(
    '[Playlists/API] Add Song To Playlists Success'
  );
  public static addSongToPlaylistsFailure = createAction(
    '[Playlists/API] Add Song To Playlists Failure',
    props<{ error: string }>()
  );
}

