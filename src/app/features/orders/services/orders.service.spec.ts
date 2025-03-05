// src/app/features/orders/services/orders.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { OrdersService } from './orders.service';
import { Order } from '../models/order';
import { StateOrder } from '../enums/state-order';
import { environment } from '../../../../environments/environment';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.urlApi;
  const mockOrders: Order[] = [
    new Order({ id: '1', type: 'type1' }),
    new Order({ id: '2', type: 'type2' }),
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Fournit HttpClient et sa version de test
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(OrdersService);
    httpTestingController = TestBed.inject(HttpTestingController);

    // Le constructeur d'OrdersService appelle refreshCollection() qui effectue un GET sur orders.
    const req = httpTestingController.expectOne(`${apiUrl}/orders`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrders);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('refreshCollection', () => {
    it('should refresh the collection', (done) => {
      service.refreshCollection();
      const req = httpTestingController.expectOne(`${apiUrl}/orders`);
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders);

      service.collection.subscribe((orders) => {
        expect(orders).toEqual(mockOrders);
        done();
      });
    });
  });

  describe('getItemById', () => {
    it('should retrieve an order by id', (done) => {
      const orderId = '1';
      service.getItemById(orderId).subscribe((order) => {
        expect(order).toEqual(mockOrders[0]);
        done();
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/orders/${orderId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockOrders[0]);
    });
  });

  describe('updateItem', () => {
    it('should update an order and refresh the collection', (done) => {
      const orderToUpdate = new Order({
        id: '1',
        type: 'updated',
        nbOfDays: 2,
      });
      service.updateItem(orderToUpdate).subscribe((order) => {
        expect(order).toEqual(orderToUpdate);
        done();
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/orders/${orderToUpdate.id}`
      );
      expect(req.request.method).toBe('PUT');
      req.flush(orderToUpdate);

      // L'appel PUT déclenche ensuite refreshCollection().
      const refreshReq = httpTestingController.expectOne(`${apiUrl}/orders`);
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush(mockOrders);
    });
  });

  describe('changeState', () => {
    it('should change the state of an order and update it', (done) => {
      const initialOrder = new Order({
        id: '1',
        state: StateOrder.OPTION,
        type: 'some type',
      });
      const newState = StateOrder.CONFIRMED;
      service.changeState(initialOrder, newState).subscribe((order) => {
        expect(order.state).toBe(newState);
        done();
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/orders/${initialOrder.id}`
      );
      expect(req.request.method).toBe('PUT');
      expect(req.request.body.state).toBe(newState);
      req.flush({ ...req.request.body });

      const refreshReq = httpTestingController.expectOne(`${apiUrl}/orders`);
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush(mockOrders);
    });
  });

  describe('addItem', () => {
    it('should add a new order and refresh the collection', (done) => {
      const newOrder = new Order({ id: '3', type: 'new order' });
      service.addItem(newOrder).subscribe((order) => {
        expect(order).toEqual(newOrder);
        done();
      });
      const req = httpTestingController.expectOne(`${apiUrl}/orders`);
      expect(req.request.method).toBe('POST');
      req.flush(newOrder);

      const refreshReq = httpTestingController.expectOne(`${apiUrl}/orders`);
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush(mockOrders);
    });
  });

  describe('delete', () => {
    it('should delete an order and refresh the collection', (done) => {
      const orderId = '1';
      service.delete(orderId).subscribe((order) => {
        expect(order).toEqual(mockOrders[0]);
        done();
      });
      const req = httpTestingController.expectOne(
        `${apiUrl}/orders/${orderId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(mockOrders[0]);

      const refreshReq = httpTestingController.expectOne(`${apiUrl}/orders`);
      expect(refreshReq.request.method).toBe('GET');
      refreshReq.flush(mockOrders);
    });
  });
});
er;
