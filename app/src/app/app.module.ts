import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UpdateAvatarComponent } from './users/update-avatar/update-avatar.component';
import { UpdateBlogImgComponent } from './blogs/update-blog-img/update-blog-img.component';
import { UpdateBlogComponent } from './blogs/update-blog/update-blog.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ForgetPasswordComponent } from './users/forget-password/forget-password.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';
import { TokenErrorInterceptor } from './interceptor/token-error.interceptor';

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
    LoginComponent,
    UpdateAvatarComponent,
    UpdateBlogImgComponent,
    UpdateBlogComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenErrorInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
