import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkListComponent } from './components/work-list/work-list.component';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './auth/auth.interceptor';
import { EditionPreviewComponent } from './components/edition-preview/edition-preview.component';
import { EditionViewerComponent } from './components/edition-viewer/edition-viewer.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { AccountComponent } from './components/account/account.component';
import { VersionPreviewComponent } from './components/version-preview/version-preview.component';
import { EditionAnnotatorComponent } from './components/edition-annotator/edition-annotator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionUploadComponent } from './components/version-upload/version-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AccountUpdateComponent } from './components/account-update/account-update.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LogInComponent } from './components/log-in/log-in.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersEffects } from './store/users/users.effects';
import { userReducer } from './store/users/users.reducer';
import { editionsReducer } from './store/editions/editions.reducer';
import { EditionsEffects } from './store/editions/editions.effects';
import { worksReducer } from './store/works/works.reducer';
import { WorksEffects } from './store/works/works.effects';
import { WorkPreviewComponent } from './components/work-preview/work-preview.component';
import { annotationsReducer } from './store/annotations/annotations.reducer';
import { AnnotationsEffects } from './store/annotations/annotations.effects';
import { notesReducer } from './store/notes/notes.reducer';
import { NotesEffects } from './store/notes/notes.effects';
import { WorkCoverComponent } from './ui/work-cover.component';
import { EmptyStateComponent } from './ui/empty-state.component';
import { AnnotationFieldsComponent } from './ui/annotation-fields.component';
import { LibraryViewComponent } from './ui/library-view/library-view.component';
import { NotesOverviewComponent } from './components/notes-overview/notes-overview.component';
import { EditionSearchComponent } from './ui/edition-search/edition-search.component';
@NgModule({ declarations: [
        AppComponent,
        WorkCoverComponent,
        EmptyStateComponent,
        AnnotationFieldsComponent,
        LibraryViewComponent,
        NotesOverviewComponent,
        EditionSearchComponent,
        WorkListComponent,
        EditionPreviewComponent,
        WorkPreviewComponent,
        EditionViewerComponent,
        VersionListComponent,
        MenuToolbarComponent,
        AccountComponent,
        VersionPreviewComponent,
        EditionAnnotatorComponent,
        VersionUploadComponent,
        AccountUpdateComponent,
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
        StoreModule.forRoot({ auth: userReducer, editions: editionsReducer, works: worksReducer, annotations: annotationsReducer, notes: notesReducer }),
        EffectsModule.forRoot([UsersEffects, EditionsEffects, WorksEffects, AnnotationsEffects, NotesEffects]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })], providers: [provideHttpClient(withInterceptors([authInterceptor]), withInterceptorsFromDi())] })
export class AppModule {
}
