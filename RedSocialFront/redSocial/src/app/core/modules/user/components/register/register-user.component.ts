import { Component } from '@angular/core'
import { type FormBuilder, type FormGroup, Validators } from '@angular/forms'
import { type UserService } from '../../services/user.service'
import { type UserInterface } from '../../interface/user.interface'
import { type Router } from '@angular/router'

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
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  onSubmit (): void {
    if (this.registerForm.valid) {
      const user: UserInterface = this.registerForm.value
      this.userService.saveUser(user).subscribe({
        next: response => {
          console.log('Succesful: ' + JSON.stringify(response))
          this.router.navigate(['/login'])
        },
        error: error => {
          console.error('Error during registration:', error)
          this.errorMessage = error
        }
      })
    }
  }
}
