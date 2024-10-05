import { Album } from "./album.model";
import { Artist } from "./artist.model";
import { Genre } from "./genre.model";
import { Path } from "./path.model";

export interface Track {
  id: number;
  fileName: string;
  pathId: number;
  title: string;
  albumId: number;
  genreId: number;
  artistId: number;
  position: number;
  year: number;
  duration: number;
  progress: number;
  playCount: number;
  lastPlayedDate?: Date;
  createDate: Date;
  modifyDate: Date;
  album: Album;
  artist: Artist;
  genre: Genre;
  path: Path;
}