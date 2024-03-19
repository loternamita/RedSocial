import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../interface/token.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Token> {
    let uri = this.baseUrl + '/auth/login';
    let body = { email, password };

    return this.http.post<Token>(uri, body);
  }
}
