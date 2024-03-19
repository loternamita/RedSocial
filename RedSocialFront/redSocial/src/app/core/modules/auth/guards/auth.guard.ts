/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Injectable } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

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
      void this.route.navigate(['/login'])
      return false
    }
  }
}
