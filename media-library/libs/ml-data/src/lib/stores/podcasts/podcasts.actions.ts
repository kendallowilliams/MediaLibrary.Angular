import { createAction, props } from "@ngrx/store";
import { Podcast } from "../../models/podcast/podcast.model";

export class PodcastsActions {
  public static loadPodcasts = createAction('[Podcasts/API] Load Podcasts');
  public static loadPodcastsSuccess = createAction(
    '[Podcasts/API] Load Podcasts Success',
    props<{ podcasts: Podcast[] }>(),
  );
  public static loadPodcastsFailure = createAction(
    '[Podcasts/API] Load Podcasts Failure',
    props<{ error: string }>(),
  );
}

