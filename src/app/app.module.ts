import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BookPreviewComponent } from './components/book-preview/book-preview.component';
import { BookViewerComponent } from './book-viewer/book-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookPreviewComponent,
    BookViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
