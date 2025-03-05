// src/app/core/guards/auth.guard.spec.ts
import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let mockRouter: { navigate: jest.Mock };
  let mockAuthService: { token$: { next: jest.Mock } };

  // Avant chaque test, on configure TestBed en fournissant des mocks pour Router et AuthService
  beforeEach(() => {
    mockRouter = { navigate: jest.fn() };
    mockAuthService = { token$: { next: jest.fn() } };

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
  });

  // Nettoyage de localStorage après chaque test
  afterEach(() => {
    localStorage.clear();
  });

  // Helper pour exécuter le guard dans le contexte d'injection de TestBed
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  it('doit retourner true si un token existe dans localStorage', () => {
    // On simule un token existant dans localStorage
    localStorage.setItem('token', 'myToken');

    // On exécute le guard avec des paramètres fictifs (le contenu n'est pas utilisé ici)
    const result = executeGuard({} as any, {} as any);

    // Le guard doit retourner true
    expect(result).toBe(true);

    // Vérification que le service AuthService a bien reçu le token via token$.next
    expect(mockAuthService.token$.next).toHaveBeenCalledWith('myToken');

    // On s'assure que la navigation n'a pas été déclenchée
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('doit retourner false et rediriger vers "/auth/sign-in" si aucun token n\'est présent', () => {
    // On s'assure qu'aucun token n'existe dans localStorage
    localStorage.removeItem('token');

    // Exécution du guard
    const result = executeGuard({} as any, {} as any);

    // Le guard doit retourner false
    expect(result).toBe(false);

    // Vérification que le service AuthService a été mis à jour avec null
    expect(mockAuthService.token$.next).toHaveBeenCalledWith(null);

    // Vérification que la méthode navigate a été appelée pour rediriger vers '/auth/sign-in'
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/sign-in']);
  });
});
