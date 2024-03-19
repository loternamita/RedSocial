/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PostInterface } from '../../post/interfaces/post.interface'

@Injectable({
  providedIn: 'root'
})
export class MuroService {
  private readonly url: string = 'http://localhost:3000/api'

  constructor (private readonly http: HttpClient) {}

  getPosts (
    page: number,
    pageSize: number
  ): Observable<{ posts: PostInterface[], total: number }> {
    const uri = this.url + '/posts/getPaginatePosts'

    return this.http.get<{ posts: PostInterface[], total: number }>(uri, {
      params: { page, pageSize }
    })
  }
}
