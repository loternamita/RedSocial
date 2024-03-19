import { Injectable } from '@angular/core';
import { type HttpClient } from '@angular/common/http';
import { type Observable } from 'rxjs';
import { type UserInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private readonly http: HttpClient) {}

  saveUser(userInterface: UserInterface): Observable<UserInterface> {
    const uri = this.baseUrl + '/users/saveuser';
    return this.http.post<UserInterface>(uri, userInterface);
  }

  getByEmail(email: string, token: string): Observable<UserInterface> {
    const uri = this.baseUrl + '/users/getByEmail/';
    const uriCompleted = uri + email;
    return this.http.get<UserInterface>(uriCompleted, {
      headers: { Authorization: token },
    });
  }

  updateUser(
    email: string,
    body: UserInterface,
    token: string
  ): Observable<UserInterface> {
    const uri = this.baseUrl + '/users/updateUser/';
    const uriCompleted = uri + email;
    return this.http.put<UserInterface>(uriCompleted, body, {
      headers: { Authorization: token },
    });
  }
}
