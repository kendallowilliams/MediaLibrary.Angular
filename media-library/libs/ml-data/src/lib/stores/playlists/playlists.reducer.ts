import { createReducer, on, Action } from '@ngrx/store';
import { PlaylistsActions } from './playlists.actions';
import { Playlist } from '../../models/playlist/Playlist.model';


export const PLAYLISTS_FEATURE_KEY = 'playlists';

export interface PlaylistsState {
  playlists: Playlist[];
  error?: string | null; // last known error (if any)
  useTestData: boolean;
}

export const initialPlaylistsState: PlaylistsState = {
  useTestData: true,
  playlists: []
};

const reducer = createReducer(
  initialPlaylistsState,
  on(
    PlaylistsActions.loadPlaylistsSuccess,
    (state, { playlists }) => ({ ...state, playlists })
  ),
  on(PlaylistsActions.loadPlaylistsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function playlistsReducer(
  state: PlaylistsState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
