import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  file: any;
  error!: string;
  today = new Date()
  admin = localStorage.getItem('admin')

  constructor(
    private formBuilder: FormBuilder,
    private userAPi: UserApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatar: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mNumber: ['', [Validators.minLength(10), Validators.required]],
      role: ['', Validators.required],
      address: ['', Validators.required],
      Dob: ['', Validators.required],
      hobbies: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signup() {
    if (this.signupForm.valid) {
      this.signupForm.value.avatar = this.file;
      const data = this.signupForm.value;
      this.userAPi.postUser(
        data.name,
        data.email,
        data.mNumber,
        data.role,
        data.password,
        data.address,
        data.Dob,
        data.hobbies,
        data.avatar
      );
      this.openSnackBar(`User: ${data.name} added`)
      this.router.navigate(['/login']);
      this.signupForm.reset();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  openSnackBar(msg:string){
    this.snackBar.open(msg,'close',{
      duration:2000,
      verticalPosition:'top',
      horizontalPosition:'end'
    })
  }
}
