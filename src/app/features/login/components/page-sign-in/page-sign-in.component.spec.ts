// src/app/features/orders/components/page-sign-in/page-sign-in.component.spec.ts
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { PageSignInComponent } from './page-sign-in.component';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';

describe('PageSignInComponent', () => {
  let component: PageSignInComponent;
  let fixture: ComponentFixture<PageSignInComponent>;
  let authServiceStub: any;

  beforeEach(async () => {
    // Création d'un stub pour AuthService
    authServiceStub = {
      signIn: jest.fn(() => of({ success: true })),
    };

    await TestBed.configureTestingModule({
      // Importation du composant standalone directement dans les imports
      imports: [PageSignInComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(PageSignInComponent);
    component = fixture.componentInstance;
    // Lancer le cycle de vie (ngOnInit initialise le formulaire)
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with email and password controls', () => {
    expect(component.form).toBeDefined();
    expect(component.form.contains('email')).toBe(true);
    expect(component.form.contains('password')).toBe(true);
  });

  it('should call authService.signIn with form value when signIn is called', fakeAsync(() => {
    // Remplissage du formulaire avec des valeurs valides
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('password123');
    expect(component.form.valid).toBe(true);

    // Appel de la méthode signIn
    component.signIn();
    tick(); // Simuler la complétion de l'Observable

    // Vérifier que le service a été appelé avec les valeurs du formulaire
    expect(authServiceStub.signIn).toHaveBeenCalledWith(component.form.value);
  }));
});
