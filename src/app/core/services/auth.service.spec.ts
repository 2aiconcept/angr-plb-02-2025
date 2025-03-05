// src/app/core/services/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let routerStub: { navigate: jest.Mock };

  describe('with empty localStorage', () => {
    beforeEach(() => {
      // On s'assure que le localStorage est vide
      localStorage.clear();
      routerStub = { navigate: jest.fn() };

      TestBed.configureTestingModule({
        providers: [
          AuthService,
          provideHttpClient(),
          provideHttpClientTesting(),
          { provide: Router, useValue: routerStub },
        ],
      });
      authService = TestBed.inject(AuthService);
      httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpTestingController.verify();
      localStorage.clear();
    });

    describe('signUp', () => {
      it('should post to /register and navigate to "auth/sign-in" on success', () => {
        const signupData = { email: 'test@test.com', password: 'pass' };
        let responseData: any;
        authService.signUp(signupData).subscribe((data) => {
          responseData = data;
        });

        const req = httpTestingController.expectOne(
          `${environment.urlApi}/register`
        );
        expect(req.request.method).toBe('POST');
        req.flush({ success: true });

        expect(routerStub.navigate).toHaveBeenCalledWith(['auth/sign-in']);
        expect(responseData).toEqual({ success: true });
      });
    });

    describe('signIn', () => {
      it('should post to /signin, update user$ and token$, save data to localStorage and navigate to "orders"', () => {
        const credentials = { email: 'test@test.com', password: 'pass' };
        let responseData: any;
        authService.signIn(credentials).subscribe((data) => {
          responseData = data;
        });

        const req = httpTestingController.expectOne(
          `${environment.urlApi}/signin`
        );
        expect(req.request.method).toBe('POST');
        const fakeResponse = {
          user: { id: 'user1', email: 'test@test.com' },
          accessToken: 'fakeToken',
        };
        req.flush(fakeResponse);

        expect(authService.user$.value).toEqual(fakeResponse.user);
        expect(authService.token$.value).toEqual(fakeResponse.accessToken);
        expect(localStorage.getItem('user')).toEqual(
          JSON.stringify(fakeResponse.user)
        );
        expect(localStorage.getItem('token')).toEqual(
          JSON.stringify(fakeResponse.accessToken)
        );
        expect(routerStub.navigate).toHaveBeenCalledWith(['orders']);
        expect(responseData).toEqual(fakeResponse);
      });
    });

    describe('signOut', () => {
      it('should remove token and user from localStorage, set user$ and token$ to null and navigate to "auth/sign-in"', () => {
        // Pré-remplissage du localStorage et des BehaviorSubjects
        localStorage.setItem('token', JSON.stringify('dummyToken'));
        localStorage.setItem(
          'user',
          JSON.stringify({ id: 'user1', email: 'test@test.com' })
        );
        authService.token$.next('dummyToken');
        authService.user$.next({ id: 'user1', email: 'test@test.com' });

        authService.signOut();

        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
        expect(authService.token$.value).toBeNull();
        expect(authService.user$.value).toBeNull();
        expect(routerStub.navigate).toHaveBeenCalledWith(['auth/sign-in']);
      });
    });
  });

  // Test spécifique pour le constructeur qui lit les données depuis le localStorage
  describe('constructor', () => {
    beforeEach(() => {
      TestBed.resetTestingModule();
      localStorage.clear();
      localStorage.setItem('token', JSON.stringify('myToken'));
      localStorage.setItem(
        'user',
        JSON.stringify({ id: 'user1', email: 'test@test.com' })
      );
      routerStub = { navigate: jest.fn() };

      TestBed.configureTestingModule({
        providers: [
          AuthService,
          provideHttpClient(),
          provideHttpClientTesting(),
          { provide: Router, useValue: routerStub },
        ],
      });
    });

    it('should initialize token$ and user$ from localStorage if available', () => {
      const instance = TestBed.inject(AuthService);
      expect(instance.token$.value).toEqual('myToken');
      expect(instance.user$.value).toEqual({
        id: 'user1',
        email: 'test@test.com',
      });
    });
  });
});
