// src/app/features/orders/components/page-orders/page-orders.component.spec.ts
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
  flush,
} from '@angular/core/testing';
import { PageOrdersComponent } from './page-orders.component';
import { RouterModule } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OrdersService } from '../../services/orders.service';
import { of } from 'rxjs';
import { Order } from '../../models/order';
import { StateOrder } from '../../enums/state-order';

describe('PageOrdersComponent', () => {
  let component: PageOrdersComponent;
  let fixture: ComponentFixture<PageOrdersComponent>;

  // Stub du service qui renvoie 2 commandes avec des propriétés définies.
  const ordersServiceStub: Partial<OrdersService> = {
    collection: of([
      new Order({
        id: '1',
        type: 'Order A',
        customer: 'Alice',
        nbOfDays: 3,
        unitPrice: 100,
        state: StateOrder.OPTION,
      }),
      new Order({
        id: '2',
        type: 'Order B',
        customer: 'Bob',
        nbOfDays: 2,
        unitPrice: 200,
        state: StateOrder.OPTION,
      }),
    ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Pour un composant standalone, on l'importe directement via "imports".
      imports: [PageOrdersComponent, RouterModule.forRoot([])],
      providers: [
        { provide: OrdersService, useValue: ordersServiceStub },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of orders from OrdersService', fakeAsync(() => {
    // Simuler l'écoulement du temps pour laisser l'async pipe s'exécuter.
    tick(500);
    flush();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // Le template génère les commandes dans les lignes du tableau (<tr>) du <tbody>.
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);

    // Vérification optionnelle : le premier <td> (customer) devrait afficher "ALICE"
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent?.trim()).toBe('ALICE');
  }));
});
