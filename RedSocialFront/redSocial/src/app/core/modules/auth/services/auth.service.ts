import { Injectable } from '@angular/core';
import { type JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly jwtHelperService: JwtHelperService) {}

  saveToken(token: string): void {
    window.sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem('token');
  }

  removeToken(): void {
    window.sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !(token == null);
  }

  decodeToken(token: string): string | null {
    const tokenDecode = this.jwtHelperService.decodeToken(token);
    const email = tokenDecode.email;
    return email;
  }
}
