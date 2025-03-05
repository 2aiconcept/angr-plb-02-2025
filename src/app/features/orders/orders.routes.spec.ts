// src/app/features/orders/orders.routes.spec.ts
import { routes } from './orders-routes';
import { Route } from '@angular/router';
import { PageOrdersComponent } from './components/page-orders/page-orders.component';
import { PageAddOrderComponent } from './components/page-add-order/page-add-order.component';
import { PageEditOrderComponent } from './components/page-edit-order/page-edit-order.component';
import { orderResolver } from '../../core/resolvers/order.resolver';

describe('Configuration des routes de la feature orders', () => {
  it('devrait définir la route par défaut avec PageOrdersComponent', () => {
    const defaultRoute = routes.find((route: Route) => route.path === '');
    expect(defaultRoute).toBeDefined();
    expect(defaultRoute?.component).toBe(PageOrdersComponent);
  });

  it('devrait définir la route "add" avec PageAddOrderComponent', () => {
    const addRoute = routes.find((route: Route) => route.path === 'add');
    expect(addRoute).toBeDefined();
    expect(addRoute?.component).toBe(PageAddOrderComponent);
  });

  it('devrait définir la route "edit/:id" avec PageEditOrderComponent et le resolver orderResolver', () => {
    const editRoute = routes.find((route: Route) => route.path === 'edit/:id');
    expect(editRoute).toBeDefined();
    expect(editRoute?.component).toBe(PageEditOrderComponent);
    expect(editRoute?.resolve).toBeDefined();
    expect(editRoute?.resolve?.['order']).toBe(orderResolver);
  });
});
