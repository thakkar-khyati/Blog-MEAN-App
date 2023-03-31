import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../Api/user-api.service';
import { User } from '../Models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users:User[] =[]

  admin=localStorage.getItem("admin")
  user=localStorage.getItem("user")
  _id = localStorage.getItem('_id')

  constructor(private userApi:UserApiService, private dialog:MatDialog, private router: Router){

  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(){
    this.userApi.getUser().subscribe({
      next:(res)=>{
        this.users = res
        console.log(this.users)
      },
      error:(e)=>{
        console.log(e)
      }
    })
  }


}
