import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserApiService } from 'src/app/Api/user-api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{

  forgetpasswordForm!:FormGroup

  constructor(private userApi: UserApiService, private formBuilder:FormBuilder,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.forgetpasswordForm = this.formBuilder.group({
      email:['',[Validators.required, Validators.email]]
    })
  }

  forgetpassword(){
    this.userApi.sendLink(this.forgetpasswordForm.value.email).subscribe({
      next:(res)=>{
        console.log("link sent")
        this.opneSnackBar("link sent")
        console.log(res)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }

  opneSnackBar(msg:string){
    this.snackBar.open(msg,'close',{
      duration:3000,
      verticalPosition:'top',
      horizontalPosition:'end'
    })
  }
}
