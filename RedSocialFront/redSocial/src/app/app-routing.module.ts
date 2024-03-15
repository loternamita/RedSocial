import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { RegisterUserComponent } from './user/components/register/register-user.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el componente de login
  { path: 'registerUser', component: RegisterUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
