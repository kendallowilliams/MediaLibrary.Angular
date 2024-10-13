import { createAction, props } from '@ngrx/store';
import { Album } from '../../models/music/album.model';
import { Artist } from '../../models/music/artist.model';
import { Track } from '../../models/music/track.model';
import { Genre } from '../../models/music/genre.model';

export class MusicActions {
  public static loadAlbums = createAction('[Music/API] Load Albums');
  public static loadAlbumsSuccess = createAction(
    '[Music/API] Load Albums Success',
    props<{ albums: Album[] }>(),
  );
  public static loadAlbumsFailure = createAction(
    '[Music/API] Load Albums Failure',
    props<{ error: string }>(),
  );
  public static loadArtists = createAction('[Music/API] Load Artists');
  public static loadArtistsSuccess = createAction(
    '[Music/API] Load Artists Success',
    props<{ artists: Artist[] }>(),
  );
  public static loadArtistsFailure = createAction(
    '[Music/API] Load Artists Failure',
    props<{ error: string }>(),
  );
  public static loadTracks = createAction('[Music/API] Load Tracks');
  public static loadTracksSuccess = createAction(
    '[Music/API] Load Tracks Success',
    props<{ tracks: Track[] }>(),
  );
  public static loadTracksFailure = createAction(
    '[Music/API] Load Tracks Failure',
    props<{ error: string }>(),
  );
  public static loadGenres = createAction('[Music/API] Load Genres');
  public static loadGenresSuccess = createAction(
    '[Music/API] Load Genres Success',
    props<{ genres: Genre[] }>(),
  );
  public static loadGenresFailure = createAction(
    '[Music/API] Load Genres Failure',
    props<{ error: string }>(),
  );
  public static updateTrack = createAction(
    '[Music/API] Update Track',
    props<{ track: Track }>()
  );
  public static updateTrackSuccess = createAction(
    '[Music/API] Update Track Success',
    props<{ track: Track }>(),
  );
  public static updateTrackFailure = createAction(
    '[Music/API] Update Track Failure',
    props<{ error: string }>(),
  );
}

