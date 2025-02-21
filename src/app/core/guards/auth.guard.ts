import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');
  authService.token$.next(token);
  if (token) {
    return true;
  } else {
    router.navigate(['/auth/sign-in']);
    return false;
  }
};
