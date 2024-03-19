/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, EventEmitter, Output } from '@angular/core'
import { PostService } from '../../services/post.service'
import { AuthService } from '../../../auth/services/auth.service'
import { FormBuilder, type FormGroup, Validators } from '@angular/forms'
import { PostInterface } from '../../interfaces/post.interface'
import { SharedPostsService } from '../../services/shared-posts.service'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter<PostInterface>()
  public nuevaPublicacion: PostInterface = {
    title: '',
    content: '',
    createdAt: new Date(),
    user: {
      age: 0,
      password: '',
      fullname: '',
      email: ''
    }
  }

  private token: string = ''
  private email: string | null = ''
  public registerForm: FormGroup

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly postService: PostService,
    private readonly authService: AuthService,
    private readonly sharedPostsService: SharedPostsService
  ) {
    this.registerForm = this.formBuilder.group({
      title: ['', (Validators.required as any).bind(this)],
      content: ['', (Validators.required as any).bind(this)]
    })
  }

  ngOnInit (): void {
    const token = this.authService.getToken()
    if (token !== null) {
      this.token = token
    }

    if (this.token !== '') {
      this.email = this.authService.decodeToken(this.token)
    }
  }

  onSubmit (): void {
    const user = {
      age: 0,
      password: '',
      fullname: '',
      email: '',
      createdAt: new Date()
    }
    if ((this.email != null) && this.registerForm.valid) {
      this.postService
        .createPost(this.email, this.nuevaPublicacion, this.token)
        .subscribe({
          next: response => {
            this.postCreated.emit(response)
            this.registerForm.reset()
            this.nuevaPublicacion = { title: '', content: '', user }
            this.sharedPostsService.loadPosts()
          },
          error: err => {
            console.error('Error al crear la publicación:', err)
          }
        })
    }
  }
}
