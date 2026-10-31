import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { AccountComponent } from './components/account/account.component';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { BookAnnotatorComponent } from './components/book-annotator/book-annotator.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuard } from './auth/auth.guard';
import { NotesOverviewComponent } from './components/notes-overview/notes-overview.component';
const screens: Routes = [
    { path: 'all-books', component: BookListComponent },
    { path: 'my-books', component: VersionListComponent },
    { path: 'notes', component: NotesOverviewComponent },
    { path: 'account', component: AccountComponent },
    { path: 'book-preview', component: BookPreviewComponent },
    { path: 'book/:id', component: BookViewerComponent },
    { path: 'book-annotator/:id', component: BookAnnotatorComponent }
];
const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    // Explicit presentation sandbox; it does not create a user or bypass the auth guard.
    { path: 'preview', children: [
            { path: '', redirectTo: 'my-books', pathMatch: 'full' },
            ...screens
        ] },
    ...screens.map(screen => ({ ...screen, canActivate: [authGuard] })),
    { path: 'login', component: LogInComponent },
    { path: '**', redirectTo: '/login' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
