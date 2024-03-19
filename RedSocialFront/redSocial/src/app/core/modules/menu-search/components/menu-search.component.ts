import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { PostInterface } from '../../post/interfaces/post.interface';
import { MenuSearchService } from '../services/menu-search.service';
import { SharedPostsService } from '../../post/services/shared-posts.service';

@Component({
  selector: 'app-menu-search',
  templateUrl: './menu-search.component.html',
  styleUrls: ['./menu-search.component.scss'],
})
export class MenuSearchComponent {
  query: string = '';
  public publicacionesFiltradas: PostInterface[] = [];
  private token: string = '';
  private email: string | null = '';

  constructor(
    private authService: AuthService,
    private menuSearchService: MenuSearchService,
    private sharedPostsService: SharedPostsService
  ) {
    const token = this.authService.getToken();
    if (token !== null) {
      this.token = token;
      this.email = this.authService.decodeToken(this.token);
    }
  }

  onSearch(): void {
    if (this.email && this.token) {
      if (this.query.trim() !== '') {
        this.menuSearchService
          .searchPosts(this.email, this.token, this.query)
          .subscribe({
            next: res => {
              this.sharedPostsService.updatePosts(res);
            },
            error: err => {
              console.error('Error: ' + err);
            },
          });
      } else {
        this.sharedPostsService.loadPosts();
      }
    }
  }
}
