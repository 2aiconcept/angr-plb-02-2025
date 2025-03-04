import { Routes } from '@angular/router';
import { PageOrdersComponent } from './components/page-orders/page-orders.component';
import { PageAddOrderComponent } from './components/page-add-order/page-add-order.component';
import { PageEditOrderComponent } from './components/page-edit-order/page-edit-order.component';
import { orderResolver } from '../../core/resolvers/order.resolver';

export const routes: Routes = [
  { path: '', component: PageOrdersComponent },
  { path: 'add', component: PageAddOrderComponent },
  {
    path: 'edit/:id',
    component: PageEditOrderComponent,
    resolve: { order: orderResolver },
  },
];
