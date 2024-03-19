import { Injectable } from '@angular/core'
import { type HttpClient } from '@angular/common/http'
import { type Observable, map } from 'rxjs'
import { UserInterface } from 'src/app/core/modules/user/interface/user.interface'
import { type PostInterface } from '../../post/interfaces/post.interface'

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
