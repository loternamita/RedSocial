/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { UserInterface } from '../../interface/user.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  public registerForm: FormGroup
  public errorMessage: string = ''

  constructor (
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      fullname: ['', (Validators.required as any).bind(this)],
      email: ['', [(Validators.required as any).bind(this), (Validators.email as any).bind(this)]],
      age: ['', (Validators.required as any).bind(this)],
      password: ['', [(Validators.required as any).bind(this), Validators.minLength(8)]]
    })
  }

  onSubmit (): void {
    if (this.registerForm.valid) {
      const user: UserInterface = this.registerForm.value
      this.userService.saveUser(user).subscribe({
        next: response => {
          console.log('Succesful: ' + JSON.stringify(response))
          void this.router.navigate(['/login'])
        },
        error: error => {
          console.error('Error during registration:', error)
          this.errorMessage = error
        }
      })
    }
  }
}
