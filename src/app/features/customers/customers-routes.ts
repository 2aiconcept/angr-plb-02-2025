import { Routes } from '@angular/router';
import { PageCustomersComponent } from './components/page-customers/page-customers.component';
import { PageAddCustomerComponent } from './components/page-add-customer/page-add-customer.component';
import { PageEditCustomerComponent } from './components/page-edit-customer/page-edit-customer.component';

export const routes: Routes = [
  { path: '', component: PageCustomersComponent },
  { path: 'add', component: PageAddCustomerComponent },
  { path: 'edit/:id', component: PageEditCustomerComponent },
];
