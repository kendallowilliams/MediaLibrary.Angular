import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLAYLISTS_FEATURE_KEY, PlaylistsState,
} from './playlists.reducer';
import { PlaylistTypes } from '../../enums/enums';

// Lookup the 'Playlists' feature state managed by NgRx
export const selectPlaylistsState =
  createFeatureSelector<PlaylistsState>(PLAYLISTS_FEATURE_KEY);

export const selectAllPlaylists = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.playlists
);

export const selectMusicPlaylists = (type: PlaylistTypes) => createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.playlists.filter(p => p.type === type)
);