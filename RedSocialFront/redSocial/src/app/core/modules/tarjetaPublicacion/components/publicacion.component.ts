/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/consistent-type-imports */
// publicacion.component.ts
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ElementRef,
  HostListener
} from '@angular/core'
import { PostInterface } from 'src/app/core/modules/post/interfaces/post.interface'
import { AuthService } from '../../auth/services/auth.service'
import { PostService } from '../../post/services/post.service'

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss']
})
export class PublicacionComponent {
  @Input()
  public posts!: PostInterface

  @Output() deleted = new EventEmitter<number>()
  public mostrarEditar: boolean = false
  public canEdit: boolean = false
  public canSave: boolean = false
  private token: string = ''
  public responseMessage: string = ''
  private email: string | null = ''

  constructor (
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly elementRef: ElementRef
  ) {}

  ngOnInit (): void {
    const token = this.authService.getToken()
    if (token !== null) {
      this.token = token
    }

    if (this.token !== '') {
      this.email = this.authService.decodeToken(this.token)
    }
  }

  toggleEditar (): void {
    this.mostrarEditar = !this.mostrarEditar
  }

  onDelete (): void {
    const title = this.posts.title
    const email = this.email

    if (email != null) {
      this.postService.deletePost(email, title, this.token).subscribe({
        next: response => {
          this.deleted.emit(this.posts.id)
        },
        error: err => {
          if (err.status === 401) {
            this.responseMessage =
              'No tiene permisos para realizar esta accion'
          }
        }
      })
    }
  }

  onEdit (post: PostInterface): void {
    let email: string | null = null

    if (this.token !== '') {
      email = this.authService.decodeToken(this.token)
    }

    if (post.user.email === email) {
      this.canEdit = true
      this.canSave = true
      this.mostrarEditar = false
    } else {
      this.responseMessage = 'No tiene permisos para realizar esta accion'
    }
  }

  onSave (): void {
    const email = this.posts.user.email
    const token = this.token
    const postUpdated = {
      title: this.posts.title,
      content: this.posts.content,
      updatedAt: new Date()
    }

    this.postService.getPosts(this.posts.id ?? 0).subscribe({
      next: (response: PostInterface) => {
        this.postService
          .updatePost(email ?? '', response.title, postUpdated, token)
          .subscribe({
            error: err => {
              console.error('Error: ' + err)

              if (err.status === 401) {
                this.responseMessage =
                  'No tiene permisos para realizar esta accion'
              }
            }
          })
      },
      error: err => {
        console.log('Error: ' + JSON.stringify(err))
      }
    })

    this.canSave = false
    this.canEdit = false
  }

  handleClickOutside (event: MouseEvent): void {
    const target = event.target as HTMLElement
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown')
    if (!dropdown.contains(target)) {
      this.mostrarEditar = false
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick (event: MouseEvent): void {
    this.handleClickOutside(event)
  }
}
