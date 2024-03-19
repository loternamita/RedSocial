import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostInterface } from '../../post/interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class MenuSearchService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  searchPosts(
    email: string,
    token: string,
    param: string
  ): Observable<PostInterface[]> {
    let uri = this.baseUrl + '/posts/searchPosts/';
    let uriCompleted = uri + email;
    return this.http.get<PostInterface[]>(uriCompleted, {
      headers: { Authorization: token },
      params: { query: param },
    });
  }
}
