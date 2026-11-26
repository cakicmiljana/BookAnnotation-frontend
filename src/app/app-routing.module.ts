import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkListComponent } from './components/work-list/work-list.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { AccountComponent } from './components/account/account.component';
import { EditionPreviewComponent } from './components/edition-preview/edition-preview.component';
import { EditionViewerComponent } from './components/edition-viewer/edition-viewer.component';
import { EditionAnnotatorComponent } from './components/edition-annotator/edition-annotator.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuard } from './auth/auth.guard';
import { guestGuard } from './auth/guest.guard';
import { NotesOverviewComponent } from './components/notes-overview/notes-overview.component';
const screens: Routes = [
    { path: 'all-books', component: WorkListComponent },
    { path: 'my-books', component: VersionListComponent },
    { path: 'notes', component: NotesOverviewComponent },
    { path: 'account', component: AccountComponent },
    { path: 'book-preview', component: EditionPreviewComponent },
    { path: 'book/:id', component: EditionViewerComponent },
    { path: 'work/:workId', component: EditionViewerComponent },
    { path: 'book-annotator/:id', component: EditionAnnotatorComponent }
];
const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    ...screens.map(screen => ({ ...screen, canActivate: [authGuard] })),
    { path: 'login', component: LogInComponent, canActivate: [guestGuard] },
    { path: '**', redirectTo: '/login' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
