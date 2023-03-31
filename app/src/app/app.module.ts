import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigatorComponent } from './navigator/navigator.component';
import { DialogComponent } from './blogs/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { SignupComponent } from './users/signup/signup.component';
import { UpdateComponent } from './users/update/update.component';
import { LoginComponent } from './users/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    NavigatorComponent,
    DialogComponent,
    FooterComponent,
    BlogComponent,
    UsersComponent,
    UserComponent,
    SignupComponent,
    UpdateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
