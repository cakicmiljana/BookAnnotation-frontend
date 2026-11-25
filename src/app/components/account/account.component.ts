import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectCurrentUser } from 'src/app/store/users/users.selector';
import { User } from 'src/app/models/user';
import { ReadingPreferences } from 'src/app/models/reading-preferences';
import { AccountUpdateComponent } from '../account-update/account-update.component';
import { PresentationService } from '../../ui/presentation.service';
import { UsersService } from '../../services/users.service';
import { logout } from '../../store/users/users.action';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';
@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css', './account-responsive.css'],
    standalone: false
})
export class AccountComponent implements OnInit {
    ui = inject(PresentationService);
    users = inject(UsersService);
    router = inject(Router);
    destroyRef = inject(DestroyRef);
    section = 'profile';
    preferences: ReadingPreferences | null = null;
    preferencesStatus = '';
    fontSizes = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    user: User | null = null;
    dialog = inject(MatDialog);
    store = inject(Store<AppState>);
    ngOnInit() {
        this.store.select(selectCurrentUser).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
            this.user = user;
        });
        this.users.getPreferences().subscribe({
            next: preferences => this.preferences = preferences,
            error: () => this.preferencesStatus = 'Could not load your preferences'
        });
    }
    savePreferences(): void {
        if (!this.preferences)
            return;
        const preferences: ReadingPreferences = {
            fontFamily: this.preferences.fontFamily,
            fontSize: this.preferences.fontSize,
            lineHeight: this.preferences.lineHeight,
            readingWidth: this.preferences.readingWidth,
            theme: this.preferences.theme,
            showHighlights: this.preferences.showHighlights
        };
        this.preferencesStatus = 'Saving…';
        this.users.savePreferences(preferences).subscribe({
            next: () => this.preferencesStatus = 'Saved',
            error: () => this.preferencesStatus = 'Could not save your preferences'
        });
    }
    openUserUpdateDialog() {
        if (!this.user)
            return;
        this.dialog.open(AccountUpdateComponent, {
            width: '520px',
            data: { ...this.user, preview: this.ui.preview }
        });
    }
    signOut(): void { this.store.dispatch(logout()); this.router.navigate(['/login']); }
}
