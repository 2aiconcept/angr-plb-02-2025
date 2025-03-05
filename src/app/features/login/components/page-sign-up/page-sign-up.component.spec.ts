// src/app/features/orders/components/page-sign-up/page-sign-up.component.spec.ts
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PageSignUpComponent } from './page-sign-up.component';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

describe('PageSignUpComponent', () => {
  let component: PageSignUpComponent;
  let fixture: ComponentFixture<PageSignUpComponent>;
  let authServiceStub: any;

  beforeEach(async () => {
    // Stub pour AuthService avec une méthode signUp qui retourne un Observable
    authServiceStub = {
      signUp: jest.fn(() => of({ success: true })),
    };

    await TestBed.configureTestingModule({
      // Importer directement le composant standalone
      imports: [PageSignUpComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSignUpComponent);
    component = fixture.componentInstance;
    // Le cycle de vie (ngOnInit) initialise le formulaire
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.form).toBeDefined();
    expect(component.form.contains('firstname')).toBe(true);
    expect(component.form.contains('lastName')).toBe(true);
    expect(component.form.contains('email')).toBe(true);
    expect(component.form.contains('password')).toBe(true);
  });

  it('should have the submit button disabled if form is invalid', fakeAsync(() => {
    // Au démarrage, le formulaire est vide et donc invalide
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector(
      'button[type="submit"]'
    ) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  }));

  it('should call auth.signUp with form value when form is valid and signUp is called', fakeAsync(() => {
    // Remplissage du formulaire avec des valeurs valides
    component.form.controls['firstname'].setValue('John');
    component.form.controls['lastName'].setValue('Doe');
    component.form.controls['email'].setValue('john.doe@example.com');
    component.form.controls['password'].setValue('12345');

    expect(component.form.valid).toBe(true);

    // Appel de la méthode signUp du composant
    component.signUp();
    tick();
    // Vérifie que la méthode signUp du service a été appelée avec les valeurs du formulaire
    expect(authServiceStub.signUp).toHaveBeenCalledWith(component.form.value);
  }));
});
