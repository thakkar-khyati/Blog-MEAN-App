import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { SignupComponent } from './users/signup/signup.component';
import { UpdateComponent } from './users/update/update.component';
import { LoginComponent } from './users/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { UpdateAvatarComponent } from './users/update-avatar/update-avatar.component';
import { ForgetPasswordComponent } from './users/forget-password/forget-password.component';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';

const routes: Routes = [
  {path:'',redirectTo:'blog',pathMatch:'full'},
  {path:'blog',component:BlogsComponent},
  {path:'selectedBlog/:id',component:BlogComponent},
  {path:'user',canActivate:[AuthGuard],component:UsersComponent},
  {path:'user/:id',canActivate:[AuthGuard],component:UserComponent},
  {path:'signup',component:SignupComponent},
  {path:'update/:id',canActivate:[AuthGuard],component:UpdateComponent},
  {path:'login',component:LoginComponent},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'reset-password/:id/:token',component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
