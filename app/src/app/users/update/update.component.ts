import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';
import { User } from 'src/app/Models/user.model';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  updateForm!: FormGroup;
  file!: object;
  _id!: string;
  user!: User;
  datePipe = new DatePipe('en-US')
  setDob!:any

  today = new Date();

  admin = localStorage.getItem('admin');
  userAuth = localStorage.getItem('user');

  constructor(
    private userApi: UserApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mNumber: ['', [Validators.minLength(10), Validators.required]],
      role: ['', Validators.required],
      address: ['', Validators.required],
      Dob: ['', Validators.required],
      hobbies: ['', Validators.required],
      password: ['', Validators.required],
    });

    this._id = this.route.snapshot.params['id'];
    this.getUser();
  }

  update() {
    const data = this.updateForm.value;
    data._id = this._id;
    data.password = this.user.password;

    this.userApi.updateUser(data);
    this.openSnackBar(`${data.name}'s data updated`);
    this.router.navigate(['/user/' + this._id]);
  }

  getUser() {
    this.userApi.getUserData(this._id).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log(this.user);
        this.setDob = this.datePipe.transform(this.user.Dob,'yyyy-MM-dd')
        console.log(this.setDob)
        this.updateForm.controls['name'].setValue(this.user.name);
        this.updateForm.controls['email'].setValue(this.user.email);
        this.updateForm.controls['mNumber'].setValue(this.user.mNumber);
        this.updateForm.controls['role'].setValue(this.user.role);
        this.updateForm.controls['address'].setValue(this.user.role);
        this.updateForm.controls['Dob'].setValue(this.setDob);
        this.updateForm.controls['hobbies'].setValue(this.user.hobbies);
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.updateForm.controls['avatar'].setValue(this.file);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'close', {
      duration: 2000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
