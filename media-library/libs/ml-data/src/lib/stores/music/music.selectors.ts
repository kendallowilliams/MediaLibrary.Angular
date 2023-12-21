import { createFeatureSelector } from '@ngrx/store';
import {
  MUSIC_FEATURE_KEY, MusicState,
} from './music.reducer';

// Lookup the 'Music' feature state managed by NgRx
export const selectMusicState =
  createFeatureSelector<MusicState>(MUSIC_FEATURE_KEY);

