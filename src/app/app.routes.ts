import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/login/login-routes').then((m) => m.routes),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/404/page-not-found-routes').then((m) => m.routes),
  },
];
