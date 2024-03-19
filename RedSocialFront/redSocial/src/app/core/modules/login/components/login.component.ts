import { Component } from '@angular/core'
import { type Router } from '@angular/router'
import { type LoginService } from '../services/login.service'
import { type AuthService } from '../../auth/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string = ''
  public password: string = ''
  public errorMessage: string = ''

  constructor (
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

  onSubmit (): void {
    this.errorMessage = '' // Limpiamos el mensaje de error
    this.loginService.login(this.email, this.password).subscribe({
      next: response => {
        this.authService.saveToken(response.token)
        this.router.navigate(['menu/muroPublicaciones'])
      },
      error: error => {
        console.error('Error during login:', error)
        this.errorMessage = 'Error during login. Please try again.'
      }
    })
  }
}
