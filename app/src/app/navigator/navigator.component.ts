import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../blogs/dialog/dialog.component';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  actionBtn:String ='Login'
  admin = localStorage.getItem("admin")
  user = localStorage.getItem("user")

  constructor(private dialog:MatDialog){}

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
    this.actionBtn = 'Login'
    location.reload()
  }

  openDialog(){
    this.dialog.open(DialogComponent,{
      width:"80%",
      height:"80%"
    })
  }
}
