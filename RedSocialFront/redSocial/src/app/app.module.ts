import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { LoginComponent } from './core/modules/login/components/login.component'
import { UpdateUserComponent } from './core/modules/user/components/update/update-user.component'
import { RegisterUserComponent } from './core/modules/user/components/register/register-user.component'
import { CreatePostComponent } from './core/modules/post/components/create/create-post.component'
import { MenuComponent } from './core/modules/menu/components/menu.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { MuroComponent } from './core/modules/muro/components/muro.component'
import { PublicacionComponent } from './core/modules/tarjetaPublicacion/components/publicacion.component'
import { AuthService } from './core/modules/auth/services/auth.service'
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt'
import { MenuSearchComponent } from './core/modules/menu-search/components/menu-search.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdateUserComponent,
    RegisterUserComponent,
    CreatePostComponent,
    MenuComponent,
    MuroComponent,
    PublicacionComponent,
    MenuSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
