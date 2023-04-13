import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../blogs/dialog/dialog.component';
import { Router } from '@angular/router';
import { UserApiService } from '../Api/user-api.service';
import { User } from '../Models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css'],
})
export class NavigatorComponent implements OnInit {
  actionBtn: String = 'Login';
  admin = localStorage.getItem('admin');
  user = localStorage.getItem('user');
  writer = localStorage.getItem('writer');
  id = localStorage.getItem('_id');
  token = localStorage.getItem('token')

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userApi: UserApiService,
    private snakeBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.admin || this.user || this.writer) {
      this.actionBtn = 'Logout';
    }
  }

  logOut() {
    if(this.id){
      this.userApi.logout(this.id)
    }
    localStorage.removeItem('admin');
    localStorage.removeItem('user');
    localStorage.removeItem('_id');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('writer');
    this.actionBtn = 'Login';

    this.router.navigate(['/blog']);
    location.reload();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '80%',
      height: '80%',
    });
  }

}
