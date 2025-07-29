import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookViewerComponent } from './components/book-viewer/book-viewer.component';
import { VersionListComponent } from './components/version-list/version-list.component';
import { MenuToolbarComponent } from './components/menu-toolbar/menu-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { AccountComponent } from './components/account/account.component';
import { VersionPreviewComponent } from './components/version-preview/version-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookPreviewComponent,
    BookViewerComponent,
    VersionListComponent,
    MenuToolbarComponent,
    AccountComponent,
    VersionPreviewComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
