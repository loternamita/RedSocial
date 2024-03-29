import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';
import { LoginComponent } from './core/modules/login/components/login.component';
import { RegisterUserComponent } from './core/modules/user/components/register/register-user.component';
import { AuthGuard } from './core/modules/auth/guards/auth.guard';
import { UpdateUserComponent } from './core/modules/user/components/update/update-user.component';
import { MenuComponent } from './core/modules/menu/components/menu.component';
import { MenuSearchComponent } from './core/modules/menu-search/components/menu-search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Ruta para el componente de login
  { path: 'registerUser', component: RegisterUserComponent },
  {
    path: 'menu',
    canActivate: [AuthGuard],
    component: MenuComponent,
    children: [
      {
        path: 'muroPublicaciones',
        loadChildren: () => import('./core/modules/muro/muro.module').then(m => m.MuroModule)
      },
      { path: 'app-update-data', component: UpdateUserComponent },
      { path: 'app-menu-search', component: MenuSearchComponent },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
