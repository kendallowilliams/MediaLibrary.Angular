import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PLAYLISTS_FEATURE_KEY, PlaylistsState,
} from './playlists.reducer';

// Lookup the 'Playlists' feature state managed by NgRx
export const selectPlaylistsState =
  createFeatureSelector<PlaylistsState>(PLAYLISTS_FEATURE_KEY);

export const selectAllPlaylists = createSelector(
  selectPlaylistsState,
  (state: PlaylistsState) => state.playlists
);