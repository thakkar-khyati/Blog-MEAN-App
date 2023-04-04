import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../blogs/dialog/dialog.component';
import { Router } from '@angular/router';
import { UserApiService } from '../Api/user-api.service';
import { User } from '../Models/user.model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  actionBtn:String ='Login'
  admin = localStorage.getItem("admin")
  user = localStorage.getItem("user")
  id = localStorage.getItem("_id")

  constructor(private dialog:MatDialog, private router:Router,private userApi:UserApiService){}

  ngOnInit(): void {
    if(this.admin === 'true' || this.user === 'true' ){
      this.actionBtn = 'Logout'
    }
  }

  logOut(){
    localStorage.removeItem("admin")
    localStorage.removeItem("user")
    localStorage.removeItem("_id")
    localStorage.removeItem("token")
    localStorage.removeItem("isLoggedIn")
    this.actionBtn = 'Login'
    
    this.router.navigate(['/blog']);
    location.reload()
  }

  openDialog(){
    this.dialog.open(DialogComponent,{
      width:"80%",
      height:"80%"
    })
  }
}
