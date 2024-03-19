// shared-posts.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject, type Observable } from 'rxjs'
import { type PostInterface } from '../interfaces/post.interface'
import { type MuroService } from '../../muro/services/muro.service'

@Injectable({
  providedIn: 'root'
})
export class SharedPostsService {
  private readonly postsSubject = new BehaviorSubject<PostInterface[]>([])
  public posts$ = this.postsSubject.asObservable()

  private readonly totalPostsSubject = new BehaviorSubject<number>(0)
  public totalPosts$ = this.totalPostsSubject.asObservable()

  private readonly currentPage = 1
  private readonly pageSize = 5

  constructor (private readonly muroService: MuroService) {}

  updatePosts (posts: PostInterface[]): void {
    this.postsSubject.next(posts)
  }

  addPost (newPost: PostInterface): void {
    const currentPosts = this.postsSubject.getValue()
    const updatedPosts = [newPost, ...currentPosts]
    this.postsSubject.next(updatedPosts)
  }

  deletePost (postId: number): void {
    const filteredPosts = this.postsSubject
      .getValue()
      .filter(post => post.id !== postId)
    this.updatePosts(filteredPosts)
  }

  loadPosts (
    page: number = this.currentPage,
    pageSize: number = this.pageSize
  ): void {
    this.muroService.getPosts(page, pageSize).subscribe({
      next: ({ posts, total }) => {
        this.postsSubject.next(posts)
        this.totalPostsSubject.next(total)
      },
      error: error => { console.error('Error loading posts:', error) }
    })
  }

  getCurrentPage (): number {
    return this.currentPage
  }

  getPageSize (): number {
    return this.pageSize
  }

  getTotalPosts (): Observable<number> {
    return this.totalPosts$
  }
}
