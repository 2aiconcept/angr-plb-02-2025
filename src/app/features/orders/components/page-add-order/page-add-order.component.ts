import { Component, inject } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { FormOrderComponent } from '../form-order/form-order.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-page-add-order',
  imports: [FormOrderComponent, NgIf, AsyncPipe],
  templateUrl: './page-add-order.component.html',
  styleUrl: './page-add-order.component.scss',
})
export class PageAddOrderComponent {
  private ordersService = inject(OrdersService);
  private router = inject(Router);
  public item!: Order;
  constructor() {
    this.item = new Order();
  }

  public save(item: Order) {
    // console.log(item);
    this.ordersService.addItem(item).subscribe((res) => {
      this.router.navigate(['orders']);
    });
  }
}
