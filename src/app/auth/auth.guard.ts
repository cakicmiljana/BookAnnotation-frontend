import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { selectIsLoggedIn } from '../store/users/users.selector';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectIsLoggedIn).pipe(
    tap(isLoggedIn => {
      if (!isLoggedIn) {
        router.navigate(['/login']);
      }
    })
  )

};
