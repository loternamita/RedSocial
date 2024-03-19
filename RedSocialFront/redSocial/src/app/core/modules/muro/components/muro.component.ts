import { ChangeDetectorRef, Component, type OnDestroy, type OnInit } from '@angular/core'
import { type PostInterface } from 'src/app/core/modules/post/interfaces/post.interface'
import { type SharedPostsService } from '../../post/services/shared-posts.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent implements OnInit, OnDestroy {
  public publicacionesAgrupadas: PostInterface[] = []
  private readonly subscriptions = new Subscription()
  public currentPage = 1
  public totalPosts = 0
  public totalPages = 0

  constructor (private readonly sharedPostsService: SharedPostsService) {}

  ngOnInit (): void {
    this.loadPosts()

    this.subscriptions.add(
      this.sharedPostsService.posts$.subscribe(postsWithUsers => {
        const res = postsWithUsers.filter(post => post.user)
        this.publicacionesAgrupadas = this.publicacionesAgrupadas.filter(
          item => item.user
        )
        this.publicacionesAgrupadas = res
      })
    )

    // Suscríbete al total de posts para manejar la paginación
    this.subscriptions.add(
      this.sharedPostsService.totalPosts$.subscribe(total => {
        this.totalPosts = total
        this.calculateTotalPages()
      })
    )
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe()
  }

  onDeletePost (postId: number): void {
    this.publicacionesAgrupadas = this.publicacionesAgrupadas.filter(
      item => item.id !== postId
    )
    this.sharedPostsService.updatePosts(this.publicacionesAgrupadas)
  }

  handlePostCreated (newPost: PostInterface): void {
    this.sharedPostsService.addPost(newPost)
  }

  calculateTotalPages (): void {
    this.totalPages = Math.ceil(
      this.totalPosts / this.sharedPostsService.getPageSize()
    )
  }

  nextPage (): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++
      this.loadPosts()
    }
  }

  prevPage (): void {
    if (this.currentPage > 1) {
      this.currentPage--
      this.loadPosts()
    }
  }

  loadPosts (): void {
    this.sharedPostsService.loadPosts(
      this.currentPage,
      this.sharedPostsService.getPageSize()
    )
  }
}
