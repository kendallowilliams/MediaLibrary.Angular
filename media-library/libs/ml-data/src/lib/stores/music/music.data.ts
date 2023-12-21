import { Album } from "../../models/music/Album.model";
import { Artist } from "../../models/music/Artist.model";
import { Track } from "../../models/music/Track.model";

export const albums: Album[] = [{
  id: 1,
  title: 'The Album',
  artistId: 1
}];

export const artists: Artist[] = [{
  id: 1,
  name: 'The Artist'
}];

export const tracks: Track[] = [1,2,3,4,5,6,7,8,9]
  .map(num => ({
    id: num,
    title: 'The Track 1',
    albumId: 1,
    artistId: 1
  }));