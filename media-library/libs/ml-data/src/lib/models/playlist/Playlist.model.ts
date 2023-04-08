import { Track } from "../music/Track.model";

export interface Playlist {
  id: number;
  name: string;
  playlistTracks: Track[];
}