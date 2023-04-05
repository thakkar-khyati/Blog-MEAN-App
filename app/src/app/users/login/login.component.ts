import { Component, OnInit,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error!: String;
  isLoggedIn = localStorage.getItem('isLoggedin')

  constructor(
    private userApi: UserApiService,
    private formBuilder: FormBuilder,
    private router: Router,
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
          console.log(`logged in as ${res.name}`);
          if (res.role === 'admin') {
            localStorage.setItem('admin', 'true');
          } else if(res.role === 'writer'){
            localStorage.setItem('writer','true')
          } else{
            localStorage.setItem('user', 'true');
          }
          localStorage.setItem('_id', res._id);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/blog'],{skipLocationChange:false})
        },
        error: (e) => {
          this.error = 'login failed try again';
          console.log(e);
        },
      });
  }
}
