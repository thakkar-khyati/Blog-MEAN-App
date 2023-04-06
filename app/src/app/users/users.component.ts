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

  page:number = 1
  count:number = 0
  tabelSize:number =2
  tabelSizes:any = [5,10,15,20]


  admin=localStorage.getItem("admin")
  user=localStorage.getItem("user")
  _id = localStorage.getItem('_id')
  isLoggedIn = localStorage.getItem('isLoggedIn')

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

  onCardDataChange(event:any){
    this.page = event
    this.getAllUsers()
  }

  oncardSizeChange(event:any){
    this.tabelSize = event.target.value
    this.page = 1
    this.getAllUsers()
  }

}
