// src/app/features/orders/components/form-order/form-order.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormOrderComponent } from './form-order.component';
import { Order } from '../../models/order';
import { StateOrder } from '../../enums/state-order';

describe('FormOrderComponent', () => {
  let component: FormOrderComponent;
  let fixture: ComponentFixture<FormOrderComponent>;
  let element: HTMLElement;

  // Création d'un ordre de test avec toutes les propriétés nécessaires
  const testOrder = new Order({
    id: 'testId',
    type: 'Test Type',
    customer: 'John Doe',
    nbOfDays: 3,
    unitPrice: 50,
    vat: 10,
    comment: 'Test comment',
    state: StateOrder.OPTION,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import direct du composant standalone (qui intègre ReactiveFormsModule, NgIf, NgFor, etc.)
      imports: [FormOrderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormOrderComponent);
    component = fixture.componentInstance;
    // Fournir la donnée d'entrée initItem
    component.initItem = testOrder;
    // Lancer le cycle de vie (ngOnInit sera appelé)
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with initItem values', () => {
    // Vérifier que la form est correctement initialisée avec les valeurs de testOrder
    const expectedFormValue = {
      unitPrice: testOrder.unitPrice,
      nbOfDays: testOrder.nbOfDays,
      vat: testOrder.vat,
      state: testOrder.state,
      type: testOrder.type,
      customer: testOrder.customer,
      comment: testOrder.comment,
      id: testOrder.id,
    };
    expect(component.form.value).toEqual(expectedFormValue);
  });

  it('should emit the form value on submit when form is valid', () => {
    // Spy sur l'EventEmitter 'submited'
    jest.spyOn(component.submited, 'emit');
    // Le formulaire initialisé avec testOrder devrait être valide
    expect(component.form.valid).toBe(true);

    // Appel de la méthode onSubmit() qui émet la valeur du formulaire
    component.onSubmit();
    expect(component.submited.emit).toHaveBeenCalledWith(component.form.value);
  });

  it('should disable the submit button if the form is invalid', () => {
    // Récupérer le bouton de soumission depuis le template
    const submitButton = element.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    // Le formulaire est valide par défaut. On rend le champ 'type' invalide en le vidant.
    component.form.get('type')?.setValue('');
    // Marquer le champ comme touché pour déclencher l'affichage du message d'erreur (si présent)
    component.form.get('type')?.markAsTouched();
    fixture.detectChanges();
    // Vérifier que le bouton est désactivé
    expect(submitButton.disabled).toBe(true);
  });
});
