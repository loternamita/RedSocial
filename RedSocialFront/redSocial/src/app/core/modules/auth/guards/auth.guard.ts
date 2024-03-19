import { Injectable } from '@angular/core'
import { type AuthService } from '../services/auth.service'
import { type Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor (
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  canActivate (): boolean {
    if (this.authService.isAuthenticated()) {
      return true
    } else {
      this.route.navigate(['/login'])
      return false
    }
  }
}
