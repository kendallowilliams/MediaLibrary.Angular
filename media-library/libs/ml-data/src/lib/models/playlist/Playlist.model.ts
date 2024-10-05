import { Track } from "../music/track.model";

export interface Playlist {
  id: number;
  name: string;
  playlistTracks: Track[];
}