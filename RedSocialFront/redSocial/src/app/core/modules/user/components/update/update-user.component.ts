/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { AuthService } from '../../../auth/services/auth.service'
import { UserInterface } from '../../interface/user.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-update-data',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  public registerForm: FormGroup
  public errorMessage: string = ''
  private readonly token: string = ''
  private readonly email: string | null = ''
  public currentUser: UserInterface | null = null

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    const token = this.authService.getToken()
    if (token !== null) {
      this.token = token
      this.email = this.authService.decodeToken(this.token)
    }

    this.registerForm = this.formBuilder.group({
      fullname: ['', (Validators.required as any).bind(this)],
      email: ['', [(Validators.required as any).bind(this), (Validators.email as any).bind(this)]],
      age: ['', (Validators.required as any).bind(this)],
      password: ['', [(Validators.required as any).bind(this), (Validators.minLength(8) as any).bind(this)]]
    })
  }

  ngOnInit (): void {
    if ((this.email != null) && (this.token.length > 0)) {
      this.userService.getByEmail(this.email, this.token).subscribe({
        next: (user: UserInterface) => {
          this.currentUser = user
          this.registerForm.patchValue({
            fullname: user.fullname,
            email: user.email,
            age: user.age
          })
        },
        error: (error: any) => {
          console.error(error)
        }
      })
    }
  }

  onSubmit (): void {
    if (this.registerForm.valid && (this.email != null) && (this.token.length > 0)) {
      const updateData: UserInterface = this.registerForm.value
      this.userService
        .updateUser(this.email, updateData, this.token)
        .subscribe({
          next: res => {
            console.log('Usuario Actualizado: ' + JSON.stringify(res))
            void this.router.navigate(['/login'])
          },
          error: err => {
            console.log(err)
          }
        })
    }
  }
}
