import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AccountComponent } from './components/account/account.component';
import { VersionPreviewComponent } from './components/version-preview/version-preview.component';
import { BookAnnotatorComponent } from './components/book-annotator/book-annotator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionUploadComponent } from './components/version-upload/version-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AccountUpdateComponent } from './components/account-update/account-update.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddAnnotationComponent } from './components/add-annotation/add-annotation.component';
import { UpdateAnnotationComponent } from './components/update-annotation/update-annotation.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersEffects } from './store/users/users.effects';
import { userReducer } from './store/users/users.reducer';
import { booksReducer } from './store/books/books.reducer';
import { BooksEffects } from './store/books/books.effects';
import { annotationsReducer } from './store/annotations/annotations.reducer';
import { AnnotationsEffects } from './store/annotations/annotations.effects';
import { notesReducer } from './store/notes/notes.reducer';
import { NotesEffects } from './store/notes/notes.effects';
import { BookCoverComponent } from './ui/book-cover.component';
import { EmptyStateComponent } from './ui/empty-state.component';
import { AnnotationFieldsComponent } from './ui/annotation-fields.component';
import { LibraryViewComponent } from './ui/library-view/library-view.component';
import { NotesOverviewComponent } from './components/notes-overview/notes-overview.component';
import { BookSearchComponent } from './ui/book-search/book-search.component';
@NgModule({ declarations: [
        AppComponent,
        BookCoverComponent,
        EmptyStateComponent,
        AnnotationFieldsComponent,
        LibraryViewComponent,
        NotesOverviewComponent,
        BookSearchComponent,
        BookListComponent,
        BookPreviewComponent,
        BookViewerComponent,
        VersionListComponent,
        MenuToolbarComponent,
        AccountComponent,
        VersionPreviewComponent,
        BookAnnotatorComponent,
        VersionUploadComponent,
        AccountUpdateComponent,
        AddAnnotationComponent,
        UpdateAnnotationComponent,
        LogInComponent
    ],
    bootstrap: [AppComponent],
    imports: [BrowserModule,
        AppRoutingModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatTooltipModule,
        MatSnackBarModule,
        StoreModule.forRoot({ auth: userReducer, books: booksReducer, annotations: annotationsReducer, notes: notesReducer }),
        EffectsModule.forRoot([UsersEffects, BooksEffects, AnnotationsEffects, NotesEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
