import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm!:FormGroup

  constructor(private userApi:UserApiService, private formBuilder:FormBuilder,private router:Router){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    this.userApi.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next:(res:any)=>{
        localStorage.setItem('token',res.token)
        console.log(`logged in as ${res.user.name}`)
        if(res.user.role === 'admin'){
          localStorage.setItem('admin','true')
        }
        else{
          localStorage.setItem('user','true')
        }
        localStorage.setItem('_id',res.user._id)
         location.reload()
        // this.router.navigate(['/blog'])
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }
}
