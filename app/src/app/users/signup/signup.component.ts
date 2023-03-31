import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder,
    private userAPi: UserApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      avatar: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mNumber: ['', [Validators.minLength(10), Validators.required]],
      role: ['', Validators.required],
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
        data.avatar
      );
      this.router.navigate(['/user']);
      this.signupForm.reset();
      location.reload();
    }
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
