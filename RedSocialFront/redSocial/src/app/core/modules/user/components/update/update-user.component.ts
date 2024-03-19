import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth.service';
import { UserInterface } from '../../interface/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  public registerForm: FormGroup;
  public errorMessage: string = '';
  private token: string = '';
  private email: string | null = '';
  public currentUser: UserInterface | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    const token = this.authService.getToken();
    if (token !== null) {
      this.token = token;
      this.email = this.authService.decodeToken(this.token);
    }

    this.registerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    if (this.email && this.token) {
      this.userService.getByEmail(this.email, this.token).subscribe({
        next: (user: UserInterface) => {
          this.currentUser = user;
          this.registerForm.patchValue({
            fullname: user.fullname,
            email: user.email,
            age: user.age,
          });
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
  }

  onSubmit() {
    if (this.registerForm.valid && this.email && this.token) {
      let updateData: UserInterface = this.registerForm.value;
      this.userService
        .updateUser(this.email, updateData, this.token)
        .subscribe({
          next: res => {
            console.log('Usuario Actualizado: ' + JSON.stringify(res));
            this.router.navigate(['/login']);
          },
          error: err => {
            console.log(err);
          },
        });
    }
  }
}
