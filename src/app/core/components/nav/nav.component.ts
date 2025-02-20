import { Component, Input } from '@angular/core';
import { IconDashbordComponent } from '../../../icons/components/icon-dashbord/icon-dashbord.component';
import { IconOrdersComponent } from '../../../icons/components/icon-orders/icon-orders.component';
import { IconProductsComponent } from '../../../icons/components/icon-products/icon-products.component';
import { IconCustomersComponent } from '../../../icons/components/icon-customers/icon-customers.component';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [
    IconDashbordComponent,
    IconOrdersComponent,
    IconProductsComponent,
    IconCustomersComponent,
    NgClass,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  @Input() isUiSidenav!: boolean;
}
