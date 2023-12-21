import { createFeatureSelector } from '@ngrx/store';
import {
  TELEVISION_FEATURE_KEY, TelevisionState,
} from './television.reducer';

// Lookup the 'Television' feature state managed by NgRx
export const selectTelevisionState =
  createFeatureSelector<TelevisionState>(TELEVISION_FEATURE_KEY);
