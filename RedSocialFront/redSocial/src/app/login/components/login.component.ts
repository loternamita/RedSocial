import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string = "";
  public password: string = "";
  public errorMessage: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit(): void {
    this.errorMessage = ''; // Limpiamos el mensaje de error
    this.loginService.login(this.email, this.password)
      .subscribe({
        next: response => {
          console.log('Login successful');
          this.router.navigate(['/home']);
          console.log('TOKEN: ' + response.token);

          localStorage.setItem('token', response.token);

        },
        error: error => {
          console.error('Error during login:', error);
          this.errorMessage = 'Error during login. Please try again.';
        }
      });
  }

}
