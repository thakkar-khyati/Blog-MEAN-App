import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { UserApiService } from 'src/app/Api/user-api.service';
import { User } from 'src/app/Models/user.model';
import { UpdateAvatarComponent } from '../update-avatar/update-avatar.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  _id!: string;
  selected!: User;

  admin = localStorage.getItem('admin');
  user = localStorage.getItem('user');

  constructor(
    private userApi: UserApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this._id = this.route.snapshot.params['id'];
    this.getUser();
  }

  getUser() {
    this.userApi.getUserData(this._id).subscribe({
      next: (res: any) => {
        this.selected = res;
      },
      error: (e) => {
        console.log(e);
      },
    });
  }

  deleteUser() {
    this.userApi.deleteUser(this._id).subscribe({
      next: (res) => {
        this.openSnackBar(`${this.selected.name}'data deleted`)
        this.router.navigate(['/user']);
      },
    });
  }

  updateAvatar(){
    this.dialog.open(UpdateAvatarComponent,{
      width:"80%",
      height:"40%",
      data:this.selected
    })
  }

  openSnackBar(msg:string){
    this.snackBar.open(msg,'close',{
      duration:2000,
      verticalPosition: 'top',
      horizontalPosition: 'end'
    })
  }
}
