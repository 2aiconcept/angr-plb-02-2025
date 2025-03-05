// app.routes.spec.ts
import { routes } from './app.routes'; // ajustez le chemin en fonction de votre arborescence
import { authGuard } from './core/guards/auth.guard';

describe("Configuration des routes de l'application", () => {
  it('devrait rediriger la route vide vers "/auth/sign-in"', () => {
    const defaultRoute = routes.find((route) => route.path === '');
    expect(defaultRoute).toBeDefined();
    expect(defaultRoute?.redirectTo).toEqual('/auth/sign-in');
    expect(defaultRoute?.pathMatch).toEqual('full');
  });

  it('devrait définir la route "auth" avec chargement paresseux', () => {
    const authRoute = routes.find((route) => route.path === 'auth');
    expect(authRoute).toBeDefined();
    expect(typeof authRoute?.loadChildren).toEqual('function');
  });

  it('devrait protéger la route "orders" avec authGuard', () => {
    const ordersRoute = routes.find((route) => route.path === 'orders');
    expect(ordersRoute).toBeDefined();
    expect(ordersRoute?.canActivate).toEqual([authGuard]);
    expect(typeof ordersRoute?.loadChildren).toEqual('function');
  });

  it('devrait protéger la route "customers" avec authGuard', () => {
    const customersRoute = routes.find((route) => route.path === 'customers');
    expect(customersRoute).toBeDefined();
    expect(customersRoute?.canActivate).toEqual([authGuard]);
    expect(typeof customersRoute?.loadChildren).toEqual('function');
  });

  it('devrait protéger la route "products" avec authGuard', () => {
    const productsRoute = routes.find((route) => route.path === 'products');
    expect(productsRoute).toBeDefined();
    expect(productsRoute?.canActivate).toEqual([authGuard]);
    expect(typeof productsRoute?.loadChildren).toEqual('function');
  });

  it('devrait protéger la route "dashbord" avec authGuard', () => {
    const dashbordRoute = routes.find((route) => route.path === 'dashbord');
    expect(dashbordRoute).toBeDefined();
    expect(dashbordRoute?.canActivate).toEqual([authGuard]);
    expect(typeof dashbordRoute?.loadChildren).toEqual('function');
  });

  it('devrait définir une route wildcard pour les pages non trouvées', () => {
    const wildcardRoute = routes.find((route) => route.path === '**');
    expect(wildcardRoute).toBeDefined();
    expect(typeof wildcardRoute?.loadChildren).toEqual('function');
  });
});
