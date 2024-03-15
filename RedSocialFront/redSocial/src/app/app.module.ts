import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/components/login.component';
import { UpdateUserComponent } from './user/components/update/update-user.component';
import { DeleteUserComponent } from './user/components/delete/delete-user.component';
import { RegisterUserComponent } from './user/components/register/register-user.component';
import { UpdatePostComponent } from './post/components/update/update-post.component';
import { DeletePostComponent } from './post/components/delete/delete-post.component';
import { CreatePostComponent } from './post/components/create/create-post.component';
import { MenuComponent } from './menu/components/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    RegisterUserComponent,
    UpdatePostComponent,
    DeletePostComponent,
    CreatePostComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
