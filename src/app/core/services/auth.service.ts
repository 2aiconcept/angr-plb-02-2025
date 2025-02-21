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
          // console.log(data);
          this.user$.next(data.user);
          // save user and faketoken dans local storage
          // localStorage.setItem('user', JSON.stringify(this.user));
          localStorage.setItem('token', JSON.stringify(data.accessToken));
          this.token$.next(data.accessToken);
          this.router.navigate(['orders']);
        })
      );
  }

  public signOut(): void {
    // vider token du localStorage
    // vider User$ et token$
    localStorage.removeItem('token');
    this.token$.next(null);
    this.user$.next(null);
    this.router.navigate(['auth/sign-in']);
  }
}
