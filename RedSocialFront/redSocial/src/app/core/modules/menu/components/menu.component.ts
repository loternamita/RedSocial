/* eslint-disable @typescript-eslint/consistent-type-imports */
import { Component } from '@angular/core'
import { AuthService } from '../../auth/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  constructor (
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  inicio (): void {
    void this.router.navigate(['/menu/muroPublicaciones'], {
      skipLocationChange: true
    })
  }

  updateData (): void {
    void this.router.navigate(['/menu/app-update-data'], {
      skipLocationChange: true
    })
  }

  cerrarSesion (): void {
    this.authService.removeToken()
    void this.router.navigate(['/login'])
  }
}
