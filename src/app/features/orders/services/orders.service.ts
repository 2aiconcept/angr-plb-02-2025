import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  pCollection!: Observable<Order[]>;

  constructor(private http: HttpClient) {}

  // get collection

  // set collection

  // change state order

  // update order

  // delete order

  // get order by id
}
