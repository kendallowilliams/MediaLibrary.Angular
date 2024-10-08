import { PlaylistTypes } from "../../enums/enums";
import { Track } from "../music/track.model";

export interface Playlist {
  id: number;
  name: string;
  type: PlaylistTypes;
  playlistTracks: Track[];
}