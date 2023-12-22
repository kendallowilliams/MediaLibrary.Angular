import { createReducer, on, Action } from '@ngrx/store';
import { MusicActions } from './music.actions';
import { Artist } from '../../models/music/Artist.model';
import { Track } from '../../models/music/Track.model';
import { Album } from '../../models/music/Album.model';

export const MUSIC_FEATURE_KEY = 'music';

export interface MusicState {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  error?: string | null; // last known error (if any)
  useTestData: boolean;
}

export const initialMusicState: MusicState = {
  useTestData: false,
  tracks: [],
  albums: [],
  artists: []
};

const reducer = createReducer(
  initialMusicState,
  on(
    MusicActions.loadAlbumsSuccess,
    (state, { albums }) => ({ ...state, albums })
  ),
  on(MusicActions.loadAlbumsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    MusicActions.loadArtistsSuccess,
    (state, { artists }) => ({ ...state, artists })
  ),
  on(MusicActions.loadArtistsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    MusicActions.loadTracksSuccess,
    (state, { tracks }) => ({ ...state, tracks })
  ),
  on(MusicActions.loadTracksFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function musicReducer(
  state: MusicState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
