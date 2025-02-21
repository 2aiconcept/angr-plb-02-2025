import { Component, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { IconDeleteComponent } from '../../../../icons/components/icon-delete/icon-delete.component';
import { IconEditComponent } from '../../../../icons/components/icon-edit/icon-edit.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateOrder } from '../../enums/state-order';

@Component({
  selector: 'app-page-orders',
  imports: [
    IconDeleteComponent,
    IconEditComponent,
    NgIf,
    NgFor,
    FormsModule,
    AsyncPipe,
  ],
  templateUrl: './page-orders.component.html',
  styleUrl: './page-orders.component.scss',
})
export class PageOrdersComponent {
  private ordersService = inject(OrdersService);
  collection$ = this.ordersService.collection;
  states = Object.values(StateOrder);
}
