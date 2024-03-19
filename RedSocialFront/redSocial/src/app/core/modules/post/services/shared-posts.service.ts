// shared-posts.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PostInterface } from '../interfaces/post.interface';
import { MuroService } from '../../muro/services/muro.service';
import { UserInterface } from '../../user/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedPostsService {
  private postsSubject = new BehaviorSubject<{ user: UserInterface, post: PostInterface }[]>([]);
  public posts$ = this.postsSubject.asObservable();

  private totalPostsSubject = new BehaviorSubject<number>(0);
  public totalPosts$ = this.totalPostsSubject.asObservable();

  private currentPage = 1;
  private pageSize = 5;

  constructor(private muroService: MuroService) { }

  updatePosts(postsWithUsers: { user: UserInterface, post: PostInterface }[]): void {
    this.postsSubject.next(postsWithUsers);
  }

  addPost(newPost: { user: UserInterface, post: PostInterface }): void {
    const currentPosts = this.postsSubject.getValue();
    const updatedPosts = [newPost, ...currentPosts];
    this.postsSubject.next(updatedPosts);
  }

  deletePost(postId: number): void {
    const filteredPosts = this.postsSubject.getValue().filter(post => post.post.id !== postId);
    this.updatePosts(filteredPosts);
  }

  loadPosts(page: number = this.currentPage, pageSize: number = this.pageSize): void {
    this.muroService.getPosts(page, pageSize).subscribe({
      next: ({ posts, total }) => {
        this.postsSubject.next(posts);
        this.totalPostsSubject.next(total);
      },
      error: error => console.error('Error loading posts:', error)
    });
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getPageSize(): number {
    return this.pageSize;
  }

  getTotalPosts(): Observable<number> {
    return this.totalPosts$;
  }
}
