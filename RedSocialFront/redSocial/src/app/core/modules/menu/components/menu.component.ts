import { Component } from '@angular/core'
import { type AuthService } from '../../auth/services/auth.service'
import { type Router } from '@angular/router'

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

  inicio () {
    this.router.navigate(['/menu/muroPublicaciones'], {
      skipLocationChange: true
    })
  }

  updateData () {
    this.router.navigate(['/menu/app-update-data'], {
      skipLocationChange: true
    })
  }

  cerrarSesion () {
    this.authService.removeToken()
    this.router.navigate(['/login'])
  }
}
