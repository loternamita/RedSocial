import { Component, OnInit } from '@angular/core'
import { type AuthService } from '../../auth/services/auth.service'
import { type PostInterface } from '../../post/interfaces/post.interface'
import { type MenuSearchService } from '../services/menu-search.service'
import { type SharedPostsService } from '../../post/services/shared-posts.service'

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss']
})
export class MenuSearchComponent {
  query: string = ''
  public publicacionesFiltradas: PostInterface[] = []
  private readonly token: string = ''
  private readonly email: string | null = ''

  constructor (
    private readonly authService: AuthService,
    private readonly menuSearchService: MenuSearchService,
    private readonly sharedPostsService: SharedPostsService
  ) {
    const token = this.authService.getToken()
    if (token !== null) {
      this.token = token
      this.email = this.authService.decodeToken(this.token)
    }
  }

  onSearch (): void {
    if (this.email && this.token) {
      if (this.query.trim() !== '') {
        this.menuSearchService
          .searchPosts(this.email, this.token, this.query)
          .subscribe({
            next: res => {
              this.sharedPostsService.updatePosts(res)
            },
            error: err => {
              console.error('Error: ' + err)
            }
          })
      } else {
        this.sharedPostsService.loadPosts()
      }
    }
  }
}
