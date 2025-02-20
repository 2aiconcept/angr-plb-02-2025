import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/login/login-routes').then((m) => m.routes),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./features/orders/orders-routes').then((m) => m.routes),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./features/customers/customers-routes').then((m) => m.routes),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products-routes').then((m) => m.routes),
  },
  {
    path: 'dashbord',
    loadChildren: () =>
      import('./features/dashbord/dashbord-routes').then((m) => m.routes),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/404/page-not-found-routes').then((m) => m.routes),
  },
];
