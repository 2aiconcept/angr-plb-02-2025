import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = environment.urlApi;
  user$ = new BehaviorSubject<any>(null);
  token$ = new BehaviorSubject<string | null>(null);
  constructor() {
    // Lors du démarrage de l'application (refresh),
    // on vérifie si des données sont stockées dans le localStorage.
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken);
        this.token$.next(parsedToken);
      } catch (e) {
        console.error('Erreur lors de la lecture du token :', e);
      }
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // console.log(parsedUser);
        this.user$.next(parsedUser);
      } catch (e) {
        console.error('Erreur lors de la lecture de l’utilisateur :', e);
      }
    }
  }
  // signup
  signUp(item: any): Observable<any> {
    return this.http.post(`${this.url}/register`, item).pipe(
      tap((data) => {
        if (data) {
          this.router.navigate(['auth/sign-in']);
        }
      })
    );
  }

  // signin

  public signIn(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post<any>(`${environment.urlApi}/signin`, credentials)
      .pipe(
        tap((data) => {
          console.log(data);
          this.user$.next(data.user);
          this.token$.next(data.accessToken);
          // save user and faketoken dans local storage
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          this.router.navigate(['orders']);
        })
      );
  }

  public signOut(): void {
    // vider token et user du localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // vider User$ et token$
    this.token$.next(null);
    this.user$.next(null);
    this.router.navigate(['auth/sign-in']);
  }
}
