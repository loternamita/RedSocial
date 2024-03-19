import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelperService: JwtHelperService) {}

  saveToken(token: string) {
    window.sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  removeToken() {
    window.sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  decodeToken(token: string): string | null {
    const tokenDecode = this.jwtHelperService.decodeToken(token);
    const email = tokenDecode.email;
    return email;
  }
}
