import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormOrderComponent } from '../form-order/form-order.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-order',
  imports: [FormOrderComponent, NgIf, AsyncPipe],
  templateUrl: './page-edit-order.component.html',
  styleUrl: './page-edit-order.component.scss',
})
export class PageEditOrderComponent {
  private route = inject(ActivatedRoute);
  private ordersService = inject(OrdersService);
  private router = inject(Router);
  item!: Order;
  ngOnInit() {
    this.route.data.subscribe((data) => (this.item = data['order']));
  }

  public save(item: Order) {
    // console.log(item);
    this.ordersService.updateItem(item).subscribe((res) => {
      this.router.navigate(['orders']);
    });
  }
}
