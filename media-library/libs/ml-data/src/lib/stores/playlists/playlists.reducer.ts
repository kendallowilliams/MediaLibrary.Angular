import { createReducer, on, Action } from '@ngrx/store';
import { PlaylistsActions } from './playlists.actions';
import { Playlist } from '../../models/playlist/playlist.model';


export const PLAYLISTS_FEATURE_KEY = 'playlists';

export interface PlaylistsState {
  playlists: Playlist[];
  isCached: boolean;
  error?: string | null; // last known error (if any)
}

export const initialPlaylistsState: PlaylistsState = {
  playlists: [],
  isCached: false
};

const reducer = createReducer(
  initialPlaylistsState,
  on(
    PlaylistsActions.loadPlaylistsSuccess,
    (state, { playlists }) => ({ ...state, playlists, isCached: true })
  ),
  on(PlaylistsActions.loadPlaylistsFailure, (state, { error }) => ({
    ...state,
    error,
    isCached: false
  })),
);

export function playlistsReducer(
  state: PlaylistsState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
