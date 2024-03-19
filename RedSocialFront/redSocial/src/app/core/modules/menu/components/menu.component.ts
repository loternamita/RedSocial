import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  inicio() {
    this.router.navigate(['/menu/muroPublicaciones'], {
      skipLocationChange: true,
    });
  }

  updateData() {
    this.router.navigate(['/menu/app-update-data'], {
      skipLocationChange: true,
    });
  }

  cerrarSesion() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
