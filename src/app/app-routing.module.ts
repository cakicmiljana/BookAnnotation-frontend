import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { AccountComponent } from './components/account/account.component';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { BookAnnotatorComponent } from './components/book-annotator/book-annotator.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'menu', component: MenuToolbarComponent , canActivate: [authGuard]},
  { path: 'all-books', component: BookListComponent, canActivate: [authGuard] },
  { path: 'my-books', component: VersionListComponent, canActivate: [authGuard] },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'book-preview', component: BookPreviewComponent, canActivate: [authGuard] },
  { path: 'book/:id', component: BookViewerComponent, canActivate: [authGuard] },
  { path: 'book-annotator/:id', component: BookAnnotatorComponent, canActivate: [authGuard] },
  { path: 'login', component: LogInComponent }
  // { path: 'account/update', component: AccountUpdateComponent },
  // { path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
