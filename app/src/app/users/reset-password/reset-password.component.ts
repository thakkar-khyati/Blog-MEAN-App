import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetform!: FormGroup;
  _id!: string;
  token!: string;
  payload!: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private userApi: UserApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.resetform = this.formBuilder.group({
      password: ['', Validators.required],
      password1: ['', Validators.required],
    });
    this._id = this.route.snapshot.params['id'];
    this.token = this.route.snapshot.params['token'];
    this.getPayload();
  }

  getPayload() {
    this.userApi.getPayload(this._id, this.token).subscribe({
      next: (res) => {
        this.payload = res;
        console.log(this.payload);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  resetpassword() {
    if (this.resetform.value.password === this.resetform.value.password1) {
      this.userApi
        .resetPassword(
          this.payload._id,
          this.payload.email,
          this.resetform.value.password
        )
        .subscribe({
          next: (res) => {
            console.log('password changed');
            console.log(this.resetform.value.password);
            console.log(res);
            this.openSnackBar('password changed')
            this.router.navigate(['/login']);
          },
          error: (e) => {
            console.log(e);
          },
        });
    } else {
      this.resetform.reset();
    }
  }

  openSnackBar(msg:string){
    this.snackBar.open(msg,'close',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top'
    })
  }
}
