import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MUSIC_FEATURE_KEY, MusicState,
} from './music.reducer';

// Lookup the 'Music' feature state managed by NgRx
export const selectMusicState =
  createFeatureSelector<MusicState>(MUSIC_FEATURE_KEY);

export const selectAllAlbums = createSelector(
  selectMusicState,
  (state: MusicState) => state.albums
);

export const selectAllArtists = createSelector(
  selectMusicState,
  (state: MusicState) => state.artists
);

export const selectAllTracks = createSelector(
  selectMusicState,
  (state: MusicState) => state.tracks
);

