import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private url = environment.urlApi;

  // signup
  signUp(item: any): Observable<any> {
    return this.http.post(`${this.url}/register`, item);
  }
}
