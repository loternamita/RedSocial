import { Injectable } from '@angular/core'
import { type HttpClient } from '@angular/common/http'
import { type Observable } from 'rxjs'
import { type Token } from '../interface/token.interface'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly baseUrl = 'http://localhost:3000/api'

  constructor (private readonly http: HttpClient) {}

  login (email: string, password: string): Observable<Token> {
    const uri = this.baseUrl + '/auth/login'
    const body = { email, password }

    return this.http.post<Token>(uri, body)
  }
}
