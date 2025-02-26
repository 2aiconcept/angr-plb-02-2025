import { Component, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { IconDeleteComponent } from '../../../../icons/components/icon-delete/icon-delete.component';
import { IconEditComponent } from '../../../../icons/components/icon-edit/icon-edit.component';
import {
  AsyncPipe,
  CurrencyPipe,
  NgFor,
  NgIf,
  UpperCasePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StateOrder } from '../../enums/state-order';
import { TotalPipe } from '../../../../shared/pipes/total.pipe';
import { Order } from '../../models/order';

@Component({
  selector: 'app-page-orders',
  imports: [
    IconDeleteComponent,
    IconEditComponent,
    NgIf,
    NgFor,
    FormsModule,
    AsyncPipe,
    UpperCasePipe,
    CurrencyPipe,
    TotalPipe,
  ],
  templateUrl: './page-orders.component.html',
  styleUrl: './page-orders.component.scss',
})
export class PageOrdersComponent {
  private ordersService = inject(OrdersService);
  collection$ = this.ordersService.collection;
  states = Object.values(StateOrder);

  changeState(item: Order, event: Event) {
    // console.log(item);
    // console.log(event.target.value);
    const target = event.target as HTMLSelectElement;
    const state = target.value as StateOrder;
    this.ordersService.changeState(item, state).subscribe((res) => {
      // item.state = res.state;
      // item = res;
      Object.assign(item, res);
    });
  }
}
