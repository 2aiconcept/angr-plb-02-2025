// src/app/features/orders/components/page-edit-order/page-edit-order.component.spec.ts
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PageEditOrderComponent } from './page-edit-order.component';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { Order } from '../../models/order';
import { StateOrder } from '../../enums/state-order';

describe('PageEditOrderComponent', () => {
  let component: PageEditOrderComponent;
  let fixture: ComponentFixture<PageEditOrderComponent>;

  // Création d'un ordre de test
  const testOrder = new Order({
    id: '1',
    type: 'Test Order',
    customer: 'Test Customer',
    nbOfDays: 1,
    unitPrice: 100,
    state: StateOrder.OPTION,
  });

  // Stub pour ActivatedRoute : simule la donnée de route { order: testOrder }
  const activatedRouteStub: Partial<ActivatedRoute> = {
    data: of({ order: testOrder }),
  };

  // Stub pour OrdersService : simule updateItem pour renvoyer un Observable de testOrder
  const ordersServiceStub: Partial<OrdersService> = {
    updateItem: jest.fn().mockReturnValue(of(testOrder)),
  };

  // Stub pour Router : simule la navigation
  const routerStub: Partial<Router> = {
    navigate: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEditOrderComponent, RouterModule.forRoot([])],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: OrdersService, useValue: ordersServiceStub },
        { provide: Router, useValue: routerStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set item from route data and display the form when data is available', fakeAsync(() => {
    // La souscription dans ngOnInit devrait définir component.item.
    tick(); // laisse le temps à la subscription de s'exécuter
    fixture.detectChanges();
    expect(component.item).toEqual(testOrder);

    // Vérification dans le DOM : l'élément <app-form-order> doit être présent
    const compiled = fixture.nativeElement as HTMLElement;
    const formOrderElement = compiled.querySelector('app-form-order');
    expect(formOrderElement).toBeTruthy();
  }));

  it('should call updateItem and navigate to orders when save is called', fakeAsync(() => {
    // Appel de la méthode save sur le composant.
    component.save(testOrder);
    tick(); // simule la complétion de l'Observable retourné par updateItem

    // Vérifie que le service a été appelé avec l'ordre correct
    expect(ordersServiceStub.updateItem).toHaveBeenCalledWith(testOrder);
    // Vérifie que la navigation vers 'orders' a été déclenchée
    expect(routerStub.navigate).toHaveBeenCalledWith(['orders']);
  }));
});
