/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { PostInterface } from '../interfaces/post.interface'
import { TargetInterface } from '../../tarjetaPublicacion/interface/target.interface'

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = 'http://localhost:3000/api'

  constructor (private readonly httpClient: HttpClient) {}

  updatePost (
    emailUpdated: string,
    titleUpdated: string,
    body: TargetInterface,
    token: string
  ): Observable<PostInterface> {
    const uri = this.baseUrl + '/posts/updatePost/'
    const params = { email: emailUpdated, title: titleUpdated }
    const uriCompleted = uri + params.email + '/' + params.title

    return this.httpClient.put<PostInterface>(uriCompleted, body, {
      headers: { authorization: token }
    })
  }

  deletePost (emailUpdated: string, titleUpdated: string, token: string): Observable<PostInterface> {
    const uri = this.baseUrl + '/posts/deletePost/'
    const params = { email: emailUpdated, title: titleUpdated }

    const uriCompleted = uri + params.email + '/' + params.title

    return this.httpClient.delete<PostInterface>(uriCompleted, {
      headers: { authorization: token }
    })
  }

  getPosts (id: number): Observable<PostInterface> {
    const uri = this.baseUrl + '/posts/getPostById/' + id
    return this.httpClient.get<PostInterface>(uri)
  }

  createPost (
    email: string | null,
    body: PostInterface,
    token: string
  ): Observable<PostInterface> {
    const uri = this.baseUrl + '/posts/savePost/' + email
    return this.httpClient.post<PostInterface>(uri, body, {
      headers: { authorization: token }
    })
  }
}
