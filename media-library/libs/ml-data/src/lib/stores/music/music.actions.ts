import { createAction, props } from '@ngrx/store';
import { Album } from '../../models/music/Album.model';
import { Artist } from '../../models/music/Artist.model';
import { Track } from '../../models/music/Track.model';

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
}

