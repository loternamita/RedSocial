// publicacion.component.ts
import { Component, EventEmitter, Input, Output, ElementRef, HostListener } from '@angular/core';
import { PostInterface } from 'src/app/core/modules/post/interfaces/post.interface';
import { UserInterface } from 'src/app/core/modules/user/interface/user.interface';
import { AuthService } from '../../auth/services/auth.service';
import { PostService } from '../../post/services/post.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent {
  @Input()
  public posts!: { user?: UserInterface; post: PostInterface; }
  @Output() deleted = new EventEmitter<number>();
  public mostrarEditar: boolean = false;
  public canEdit: boolean = false;
  public canSave: boolean = false;
  private token: string = "";
  public responseMessage: string = "";
  private email: string | null = "";

  constructor(private authService: AuthService, private postService: PostService, private elementRef: ElementRef) { }

  ngOnInit() {
    const token = this.authService.getToken();
    if (token !== null) {
      this.token = token;
    }

    if (this.token) {
      this.email = this.authService.decodeToken(this.token);
    }
  }

  toggleEditar() {
    this.mostrarEditar = !this.mostrarEditar;
  }

  onDelete() {

    let title = this.posts.post.title;
    let email = this.email;

    if (email) {
      this.postService.deletePost(email, title, this.token)
        .subscribe({
          next: response => {
            this.deleted.emit(this.posts.post.id);
          },
          error: err => {
            if (err.status === 401) {
              this.responseMessage = 'No tiene permisos para realizar esta accion';
            }
          }
        });
    }
  }

  onEdit(post: { user?: UserInterface, post: PostInterface }) {
    let email: string | null = null;

    if (this.token) {
      email = this.authService.decodeToken(this.token);
    }

    if (post.user?.email === email) {
      this.canEdit = true;
      this.canSave = true;
      this.mostrarEditar = false;
    } else {
      this.responseMessage = 'No tiene permisos para realizar esta accion';
    }
  }

  onSave() {
    let email = this.posts.user?.email;
    let token = this.token;
    let postUpdated = { title: this.posts.post.title, content: this.posts.post.content, updatedAt: new Date() };


    this.postService.getPosts(this.posts.post.id ?? 0).subscribe({
      next: (response: PostInterface) => {
        this.postService.updatePost(email ?? '', response.title, postUpdated, token)
          .subscribe({
            error: (err) => {
              console.error('Error: ' + err);

              if (err.status === 401) {
                this.responseMessage = 'No tiene permisos para realizar esta accion';
              }
            }
          });
      },
      error: (err) => {
        console.log('Error: ' + JSON.stringify(err));
      }
    });


    this.canSave = false;
    this.canEdit = false;
  }

  handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
    if (!dropdown.contains(target)) {
      this.mostrarEditar = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.handleClickOutside(event);
  }
}


