/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { LoginService } from '../services/login.service'
import { AuthService } from '../../auth/services/auth.service'

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
        void this.router.navigate(['menu/muroPublicaciones'])
      },
      error: error => {
        console.error('Error during login:', error)
        this.errorMessage = 'Error during login. Please try again.'
      }
    })
  }
}
