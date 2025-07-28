import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: 'menu', component: MenuToolbarComponent },
  // { path: 'statistics', component: StatisticsComponent },
  { path: 'all-books', component: BookListComponent },
  { path: 'my-books', component: VersionListComponent },
  { path: 'account', component: AccountComponent},
  // { path: 'account/update', component: AccountUpdateComponent },
  // { path: 'signup', component: SignupComponent},
  // { path: 'book-data/:id', component: BookDataComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
