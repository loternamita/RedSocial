import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  saveUser(userInterface: UserInterface): Observable<UserInterface> {
    let uri = this.baseUrl + "/users/saveuser"
    return this.http.post<UserInterface>(uri, userInterface);
  }
}
