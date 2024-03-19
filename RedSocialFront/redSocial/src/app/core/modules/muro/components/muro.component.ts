import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { UserInterface } from '../../user/interface/user.interface';
import { PostInterface } from "src/app/core/modules/post/interfaces/post.interface";
import { SharedPostsService } from "../../post/services/shared-posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-muro',
  templateUrl: './muro.component.html',
  styleUrls: ['./muro.component.scss']
})
export class MuroComponent implements OnInit, OnDestroy {
  public publicacionesAgrupadas: { user: UserInterface, post: PostInterface }[] = [];
  private subscriptions = new Subscription();
  public currentPage = 1;
  public totalPosts = 0;
  public totalPages = 0;

  constructor(private sharedPostsService: SharedPostsService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadPosts();

    this.subscriptions.add(this.sharedPostsService.posts$.subscribe(postsWithUsers => {
      this.publicacionesAgrupadas = postsWithUsers;
      this.changeDetectorRef.detectChanges();
    }));

    // Suscríbete al total de posts para manejar la paginación
    this.subscriptions.add(this.sharedPostsService.totalPosts$.subscribe(total => {
      this.totalPosts = total;
      this.calculateTotalPages();
    }));


  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onDeletePost(postId: number): void {
    this.publicacionesAgrupadas = this.publicacionesAgrupadas.filter(item => item.post.id !== postId);
  }

  handlePostCreated(newPost: PostInterface): void {
    if (newPost.users) {
      const updatedList = [{ user: newPost.users, post: newPost }, ...this.publicacionesAgrupadas];
      this.publicacionesAgrupadas = updatedList;
      this.sharedPostsService.updatePosts(updatedList);
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalPosts / this.sharedPostsService.getPageSize());
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPosts();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  loadPosts(): void {
    this.sharedPostsService.loadPosts(this.currentPage, this.sharedPostsService.getPageSize());
  }
}

