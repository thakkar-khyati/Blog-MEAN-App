import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn = localStorage.getItem('isLoggedin')

  constructor(
    private userApi: UserApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snakebar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

  }


  login() {
    this.userApi
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: (res: any) => {
          //console.log(`logged in as ${res.name}`);
          if (res.role === 'admin') {
            localStorage.setItem('admin', 'true');
          } else if(res.role === 'writer'){
            localStorage.setItem('writer','true')
          } else{
            localStorage.setItem('user', 'true');
          }
          localStorage.setItem('_id', res._id);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('reload', 'true');
          this.router.navigate(['/blog'],{skipLocationChange:false})
        },
        error: (e) => {
          this.openSnakeBar('login failed try again')
          console.log(e);
        },
      });
  }

  openSnakeBar(error:string){

    this.snakebar.open(error,'Try Again',{
      verticalPosition: 'top',
      horizontalPosition:'center',
      panelClass: ['Bar']
    })
  }
}
