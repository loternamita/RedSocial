import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UserInterface } from "src/app/core/modules/user/interface/user.interface";
import { PostInterface } from "../../post/interfaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class MuroService {
  private url: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getPosts(page: number, pageSize: number): Observable<{ posts: { user: UserInterface, post: PostInterface }[], total: number }> {

    let uri = this.url + "/posts/getPaginatePosts"

    return this.http.get<{ posts: PostInterface[], total: number }>(uri, { params: { page, pageSize } }).pipe(
      map(response => {
        const postsWithUsers = response.posts.map(post => ({ user: post.users!, post }));
        return { posts: postsWithUsers, total: response.total };
      })
    );
  }
}
