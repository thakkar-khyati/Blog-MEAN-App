import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  admin = localStorage.getItem('admin');
  userAuth = localStorage.getItem('user');

  constructor(
    private userApi: UserApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
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

    this._id = this.route.snapshot.params['id'];
    this.getUser();
  }

  update() {
    this.updateForm.value.avatar = this.file;
    const data = this.updateForm.value;
    data._id = this._id;
    data.password = this.user.password;
    console.log(data);
    this.userApi.updateUser(
      data.name,
      data.email,
      data.mNumber,
      data.role,
      data.password,
      data.address,
      data.Dob,
      data.hobbies,
      data.avatar,
      data._id
    );
    this.router.navigate(['/user/' + this._id]);
  }

  getUser() {
    this.userApi.getUserData(this._id).subscribe({
      next: (res: any) => {
        this.user = res;
        console.log(this.user);
        this.updateForm.controls['name'].setValue(this.user.name);
        this.updateForm.controls['email'].setValue(this.user.email);
        this.updateForm.controls['mNumber'].setValue(this.user.mNumber);
        this.updateForm.controls['role'].setValue(this.user.role);
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
}
