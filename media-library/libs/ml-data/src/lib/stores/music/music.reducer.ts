import { createReducer, on, Action } from '@ngrx/store';
import { MusicActions } from './music.actions';
import { Artist } from '../../models/music/artist.model';
import { Track } from '../../models/music/track.model';
import { Album } from '../../models/music/album.model';
import { Genre } from '../../models/music/genre.model';

export const MUSIC_FEATURE_KEY = 'music';

export interface MusicState {
  tracks: Track[];
  albums: Album[];
  artists: Artist[];
  genres: Genre[];
  error?: string | null; // last known error (if any)
}

export const initialMusicState: MusicState = {
  tracks: [],
  albums: [],
  artists: [],
  genres: []
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
  })),
  on(
    MusicActions.loadGenresSuccess,
    (state, { genres }) => ({ ...state, genres })
  ),
  on(MusicActions.loadGenresFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(
    MusicActions.updateTrackSuccess,
    (state, { track }) => ({ 
      ...state, 
      tracks: state.tracks.map(t => t.id === track.id ? track : t) 
    })
  ),
  on(MusicActions.updateTrackFailure, (state, { error }) => ({
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
