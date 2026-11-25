import { Component, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';
import { profileUpdated } from 'src/app/store/users/users.action';
@Component({
    selector: 'app-account-update',
    templateUrl: './account-update.component.html',
    styleUrls: ['./account-update.component.css'],
    standalone: false
})
export class AccountUpdateComponent {
    data = inject(MAT_DIALOG_DATA);
    username: string = "";
    email: string = "";
    currentPassword = '';
    password: string = "";
    confirmPassword = '';
    previewSaved = false;
    saving = false;
    errorMessage = '';
    constructor(private service: UsersService, private snackBar: MatSnackBar, private store: Store, private dialogRef: MatDialogRef<AccountUpdateComponent>) {
    }
    ngOnInit() {
        if (this.data) {
            this.username = this.data.username;
            this.email = this.data.email;
        }
    }
    submitProfile(): void {
        if (this.password !== this.confirmPassword)
            return;
        if (this.data.preview) {
            this.previewSaved = true;
            return;
        }
        this.updateUser();
    }
    updateUser() {
        const usernameChanged = this.username.trim() !== this.data.username;
        const passwordChanged = this.password !== '';

        let profileRequest: Observable<User | null> = of(null);
        if (usernameChanged) {
            profileRequest = this.service.updateProfile(this.username.trim()).pipe(
                tap(user => this.store.dispatch(profileUpdated({ user })))
            );
        }
        let passwordRequest: Observable<void | null> = of(null);
        if (passwordChanged) {
            passwordRequest = this.service.changePassword(this.currentPassword, this.password);
        }

        this.saving = true;
        this.errorMessage = '';
        profileRequest.pipe(switchMap(() => passwordRequest)).subscribe({
            next: () => {
                this.saving = false;
                this.snackBar.open('You successfully updated your data ✅', 'Close', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'bottom',
                });
                this.dialogRef.close();
            },
            error: (err: HttpErrorResponse) => {
                this.saving = false;
                this.errorMessage = this.readError(err);
            }
        });
    }
    private readError(err: HttpErrorResponse): string {
        const message = err.error?.message;
        if (Array.isArray(message)) {
            return message.join(', ');
        }
        if (message) {
            return message;
        }
        return 'Data update failed. Please try again.';
    }
}
