import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = environment.urlApi;

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
}
