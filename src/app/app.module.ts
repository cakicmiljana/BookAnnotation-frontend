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
import { BookAnnotatorComponent } from './components/book-annotator/book-annotator.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionUploadComponent } from './components/version-upload/version-upload.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AccountUpdateComponent } from './components/account-update/account-update.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AddAnnotationComponent } from './components/add-annotation/add-annotation.component';
import {MatSelectModule} from '@angular/material/select';
import { UpdateAnnotationComponent } from './components/update-annotation/update-annotation.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LogInComponent } from './components/log-in/log-in.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatTooltipModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
