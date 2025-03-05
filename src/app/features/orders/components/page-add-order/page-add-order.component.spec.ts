// src/app/features/orders/components/page-add-order/page-add-order.component.spec.ts
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PageAddOrderComponent } from './page-add-order.component';
import { RouterModule, Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OrdersService } from '../../services/orders.service';
import { of } from 'rxjs';
import { Order } from '../../models/order';

describe('PageAddOrderComponent', () => {
  let component: PageAddOrderComponent;
  let fixture: ComponentFixture<PageAddOrderComponent>;

  // Création d'un ordre de test (on pourra ajouter des propriétés spécifiques si nécessaire)
  const testOrder = new Order({ id: '123', type: 'Test Order' });

  // Stub pour le service OrdersService : simule addItem pour renvoyer un Observable contenant l'ordre passé
  const ordersServiceStub: Partial<OrdersService> = {
    addItem: jest.fn().mockReturnValue(of(testOrder)),
  };

  // Stub pour Router : simule la navigation sans la réaliser réellement
  const routerStub: Partial<Router> = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import direct du composant standalone et du RouterModule pour fournir le contexte du router
      imports: [PageAddOrderComponent, RouterModule.forRoot([])],
      providers: [
        { provide: OrdersService, useValue: ordersServiceStub },
        { provide: Router, useValue: routerStub },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize item with a new Order', () => {
    // Le constructeur doit initialiser item avec une instance de Order
    expect(component.item).toBeInstanceOf(Order);
  });

  it('should render the form component when item is set', () => {
    // On vérifie que le template affiche <app-form-order> puisque item est défini.
    const compiled = fixture.nativeElement as HTMLElement;
    const formOrderElement = compiled.querySelector('app-form-order');
    expect(formOrderElement).toBeTruthy();
  });

  it('should call addItem on OrdersService and navigate to "orders" when save is called', fakeAsync(() => {
    // Appel de la méthode save du composant en lui passant l'item courant.
    component.save(component.item);
    tick(); // Simule la complétion de l'Observable retourné par addItem

    // Vérifie que la méthode addItem a été appelée avec l'item courant
    expect(ordersServiceStub.addItem).toHaveBeenCalledWith(component.item);
    // Vérifie que la navigation vers 'orders' a été déclenchée
    expect(routerStub.navigate).toHaveBeenCalledWith(['orders']);
  }));
});
