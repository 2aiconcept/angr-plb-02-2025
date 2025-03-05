import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '../../../../environments/environment';
import { StateOrder } from '../enums/state-order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // private pCollection!: Observable<Order[]>;
  private collection$ = new BehaviorSubject<Order[]>([]);
  private url = environment.urlApi;

  constructor(private http: HttpClient) {
    this.refreshCollection();
    // this.collection = this.http.get<Order[]>(`${this.url}/orders`);
  }

  // init and refreshcollection
  refreshCollection() {
    this.http.get<Order[]>(`${this.url}/orders`).subscribe((data) => {
      this.collection$.next(data);
    });
  }

  // get collection
  get collection(): Observable<Order[]> {
    return this.collection$;
  }

  // set collection
  // set collection(col: Observable<Order[]>) {
  //   this.pCollection = col;
  // }

  public changeState(item: Order, state: StateOrder): Observable<Order> {
    // item.state = state;
    // const obj = {...item};
    const obj = new Order({ ...item });
    obj.state = state;
    return this.updateItem(obj);
  }

  /**
   * @function updateItem
   * @description update item via http.put(item)
   * @return Observable<Order>
   */
  public updateItem(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.url}/orders/${item.id}`, item).pipe(
      tap((data) => {
        this.refreshCollection();
      })
    );
  }

  // delete order

  /**
   * @function getItemById
   * @param {id: string}
   * @description http.get(..../id)
   * @return Observable<Order>
   */
  public getItemById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.url}/orders/${id}`);
  }

  public addItem(item: Order): Observable<Order> {
    return this.http.post<Order>(`${this.url}/orders`, item).pipe(
      tap((data) => {
        this.refreshCollection();
      })
    );
  }

  public delete(id: string): Observable<Order> {
    return this.http.delete<Order>(`${this.url}/orders/${id}`).pipe(
      tap((data) => {
        this.refreshCollection();
      })
    );
  }
}
