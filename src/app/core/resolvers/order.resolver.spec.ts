// src/app/core/resolvers/order.resolver.spec.ts
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, throwError, Observable } from 'rxjs';
import { orderResolver } from './order.resolver';
import { OrdersService } from '../../features/orders/services/orders.service';
import { Order } from '../../features/orders/models/order';

describe('orderResolver', () => {
  let mockOrdersService: Partial<OrdersService>;

  beforeEach(() => {
    // Création d'un mock pour OrdersService avec un spy Jest pour la méthode getItemById.
    mockOrdersService = {
      getItemById: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: OrdersService, useValue: mockOrdersService }],
    });
  });

  // Helpers pour créer de faux snapshots
  function createFakeRoute(id: string | null): ActivatedRouteSnapshot {
    return {
      paramMap: {
        get: (_: string) => id,
      },
    } as unknown as ActivatedRouteSnapshot;
  }

  function createFakeRouterState(): RouterStateSnapshot {
    return {} as RouterStateSnapshot;
  }

  // Helper pour s'assurer que le résultat est un Observable
  function toObservable<T>(result: T | Observable<T>): Observable<T> {
    return result && typeof (result as any).subscribe === 'function'
      ? (result as Observable<T>)
      : of(result as T);
  }

  it("retourne null si aucun id n'est fourni", (done) => {
    const route = createFakeRoute(null);
    const state = createFakeRouterState();

    TestBed.runInInjectionContext(() => {
      const result = orderResolver(route, state);
      const result$ = toObservable(result);
      result$.subscribe((value) => {
        expect(value).toBeNull();
        done();
      });
    });
  });

  it('retourne une instance de Order si un id est fourni et getItemById renvoie des données', (done) => {
    const fakeData = { id: '123', name: 'Commande 123' }; // Données fictives
    const route = createFakeRoute('123');
    const state = createFakeRouterState();
    (mockOrdersService.getItemById as jest.Mock).mockReturnValue(of(fakeData));

    TestBed.runInInjectionContext(() => {
      const result = orderResolver(route, state);
      const result$ = toObservable(result);
      result$.subscribe((value) => {
        expect(value).toBeInstanceOf(Order);
        done();
      });
    });
  });

  it('retourne null si getItemById échoue', (done) => {
    const route = createFakeRoute('123');
    const state = createFakeRouterState();
    (mockOrdersService.getItemById as jest.Mock).mockReturnValue(
      throwError(() => new Error('Erreur'))
    );

    TestBed.runInInjectionContext(() => {
      const result = orderResolver(route, state);
      const result$ = toObservable(result);
      result$.subscribe((value) => {
        expect(value).toBeNull();
        done();
      });
    });
  });
});
