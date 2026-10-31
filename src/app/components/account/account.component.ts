import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { selectCurrentUser } from 'src/app/store/users/users.selector';
import { User } from 'src/app/models/user';
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
    preferredFont = 'Literary serif';
    preferredTheme = 'Warm paper';
    preferredSize = 'Comfortable · 21px';
    user: User | null = null;
    dialog = inject(MatDialog);
    store = inject(Store<AppState>);
    ngOnInit() {
        if (this.ui.preview) {
            this.users.getUserById(1).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => this.user = user || null);
            return;
        }
        this.store.select(selectCurrentUser).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(user => {
            this.user = user;
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
