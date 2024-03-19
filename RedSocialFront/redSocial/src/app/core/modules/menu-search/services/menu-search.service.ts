/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PostInterface } from '../../post/interfaces/post.interface'

@Injectable({
  providedIn: 'root'
})
export class MenuSearchService {
  private readonly baseUrl = 'http://localhost:3000/api'

  constructor (private readonly http: HttpClient) {}

  searchPosts (
    email: string,
    token: string,
    param: string
  ): Observable<PostInterface[]> {
    const uri = this.baseUrl + '/posts/searchPosts/'
    const uriCompleted = uri + email
    return this.http.get<PostInterface[]>(uriCompleted, {
      headers: { Authorization: token },
      params: { query: param }
    })
  }
}
