import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import * as FeedActions from './feed.action';
import * as AnnotationsActions from '../annotations/annotations.actions';
import * as BooksActions from '../books/books.action';
import * as NotesActions from '../notes/notes.actions';
import { FeedService } from 'src/app/services/feed.service';
import { selectBookById } from '../books/books.selector';
import { AppState } from '../app.state';
import { FeedItem } from 'src/app/models/feed-item';

@Injectable()
export class FeedEffects {
  constructor(
    private actions$: Actions,
    private feedService: FeedService,
    private store: Store<AppState>
  ) {}

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

  // Create feed item when annotation is created
  createAnnotationFeedItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.addAnnotationSuccess),
      withLatestFrom(
        this.store.select(state => state.auth.user),
        this.store.select(selectBookById(0))
      ),
      switchMap(([action, user, book]) => {
        if (!user) return [];
        return this.store.select(selectBookById(action.annotation.bookId)).pipe(
          map(selectedBook => {
            const feedItem: FeedItem = {
              id: 0,
              type: 'annotation',
              userId: user.id,
              bookId: action.annotation.bookId,
              content: action.annotation.comment,
              createdAt: action.annotation.createdAt,
              deletedAt: null,
              bookTitle: selectedBook?.title,
              bookAuthor: selectedBook?.author
            };
            return FeedActions.addFeedItem({ item: feedItem });
          })
        );
      })
    )
  );

  // Create feed item when annotation is updated
  updateAnnotationFeedItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.updateAnnotationSuccess),
      switchMap(action =>
        this.store.select(selectBookById(action.annotation.bookId)).pipe(
          withLatestFrom(this.store.select(state => state.auth.user)),
          map(([book, user]) => {
            if (!user) return null;
            const feedItem: FeedItem = {
              id: 0,
              type: 'annotation',
              userId: user.id,
              bookId: action.annotation.bookId,
              content: action.annotation.comment,
              createdAt: action.annotation.createdAt,
              deletedAt: null,
              bookTitle: book?.title,
              bookAuthor: book?.author
            };
            return FeedActions.addFeedItem({ item: feedItem });
          }),
          switchMap(action => action ? [action] : [])
        )
      )
    )
  );

  // Create feed item when annotation is deleted
  deleteAnnotationFeedItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AnnotationsActions.deleteAnnotationSuccess),
      withLatestFrom(this.store.select(state => state.auth.user)),
      map(([action, user]) => {
        if (!user) return null;
        const feedItem: FeedItem = {
          id: 0,
          type: 'annotation',
          userId: user.id,
          bookId: 0,
          content: 'Deleted annotation',
          createdAt: new Date(),
          deletedAt: new Date()
        };
        return FeedActions.addFeedItem({ item: feedItem });
      }),
      switchMap(action => action ? [action] : [])
    )
  );

  // Create feed item when note is created
  createNoteFeedItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.createNoteSuccess),
      switchMap(action =>
        this.store.select(selectBookById(action.note.bookId)).pipe(
          withLatestFrom(this.store.select(state => state.auth.user)),
          map(([book, user]) => {
            if (!user) return null;
            const feedItem: FeedItem = {
              id: 0,
              type: 'note',
              userId: user.id,
              bookId: action.note.bookId,
              content: action.note.content,
              createdAt: new Date(),
              deletedAt: null,
              bookTitle: book?.title,
              bookAuthor: book?.author
            };
            return FeedActions.addFeedItem({ item: feedItem });
          }),
          switchMap(action => action ? [action] : [])
        )
      )
    )
  );

  // Create feed item when note is updated
  updateNoteFeedItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteSuccess),
      switchMap(action =>
        this.store.select(selectBookById(action.note.bookId)).pipe(
          withLatestFrom(this.store.select(state => state.auth.user)),
          map(([book, user]) => {
            if (!user) return null;
            const feedItem: FeedItem = {
              id: 0,
              type: 'note',
              userId: user.id,
              bookId: action.note.bookId,
              content: action.note.content,
              createdAt: new Date(),
              deletedAt: null,
              bookTitle: book?.title,
              bookAuthor: book?.author
            };
            return FeedActions.addFeedItem({ item: feedItem });
          }),
          switchMap(action => action ? [action] : [])
        )
      )
    )
  );

  // Create feed item when note is deleted
  deleteNoteFeedItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNoteSuccess),
      withLatestFrom(this.store.select(state => state.auth.user)),
      map(([action, user]) => {
        if (!user) return null;
        const feedItem: FeedItem = {
          id: 0,
          type: 'note',
          userId: user.id,
          bookId: 0,
          content: 'Deleted note',
          createdAt: new Date(),
          deletedAt: new Date()
        };
        return FeedActions.addFeedItem({ item: feedItem });
      }),
      switchMap(action => action ? [action] : [])
    )
  );

  // Create feed item when book is uploaded
  uploadBookFeedItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.uploadBookSuccess),
      withLatestFrom(this.store.select(state => state.auth.user)),
      map(([action, user]) => {
        if (!user) return null;
        const feedItem: FeedItem = {
          id: 0,
          type: 'book',
          userId: user.id,
          bookId: action.book.id,
          content: action.book.title,
          createdAt: action.book.createdAt,
          deletedAt: null,
          bookTitle: action.book.title,
          bookAuthor: action.book.author
        };
        return FeedActions.addFeedItem({ item: feedItem });
      }),
      switchMap(action => action ? [action] : [])
    )
  );
}