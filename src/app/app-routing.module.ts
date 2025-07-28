import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { AccountComponent } from './components/account/account.component';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';

const routes: Routes = [
  { path: 'menu', component: MenuToolbarComponent },
  { path: 'all-books', component: BookListComponent },
  { path: 'my-books', component: VersionListComponent },
  { path: 'account', component: AccountComponent},
  { path: 'book-preview', component: BookPreviewComponent},
  { path: 'book/:id', component: BookViewerComponent }
  // { path: 'account/update', component: AccountUpdateComponent },
  // { path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
