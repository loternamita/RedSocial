import { Injectable } from '@angular/core'
import { type HttpClient } from '@angular/common/http'
import { type Observable } from 'rxjs'
import { type PostInterface } from '../../post/interfaces/post.interface'

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
