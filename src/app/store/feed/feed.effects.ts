import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import * as FeedActions from './feed.action';
import { FeedService } from 'src/app/services/feed.service';

@Injectable()
export class FeedEffects {
  constructor(private actions$: Actions, private feedService: FeedService) {}

  loadFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.loadFeed),
      switchMap(action =>
        this.feedService.getFeed(action.userId).pipe(
          map(feed => FeedActions.loadFeedSuccess({ feed })),
          catchError(() => of({ type: 'load feed error'}))
        )
      )
    )
  );
}